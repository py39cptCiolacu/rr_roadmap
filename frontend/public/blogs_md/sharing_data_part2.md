## Table of Contents

1. [Introduction to PyRMap](#1-introduction-to-pyrmap)
2. [mmap syscall](#2-mmap-syscall)
   - [2.1 mmap as an IPC mechanism](#21-mmap-as-an-ipc-mechanism)
   - [2.2 Advantages over traditional R-Python communication](#22-advantages-over-traditional-r-python-communication)
   - [2.3 The role of `/dev/shm`](#23-the-role-of-dev-shm)
3. [PyRMap workflow](#3-pyrmap-workflow)
4. [Metadata File Structure](#4-metadata-file-structure)
5. [Other Functionalities](#5-other-functionalities)
   - [5.1 Multiple calls with one data file](#51-multiple-calls-with-one-data-file)
   - [5.2 R - Python pipeline](#52-r-python-pipeline)
   - [5.3 Sharing S3 object](#53-sharing-s3-object)
6. [Resources](#6-resources)

---

### 1. Introduction to PyRMap

PyRMap is an R–Python communication protocol built on top of the mmap system call. Its primary goal is performance, aiming to minimize the overhead and latency involved in data exchange between the two processes.

Beyond speed, PyRMap also abstracts away much of the boilerplate typically required from the user, such as explicit data type conversions between R and Python. These conversions are handled automatically by the protocol.

As shown in the example below, the user experience is intentionally simple: from the R side, it feels like calling a regular function, while on the Python side it only requires decorating a script with a dedicated decorator.

**R - Caller**

```r
input_data <- c(1, 6, 14, 7)
python_script_path_sum <- "sum.py"

result <- run_python(
    data = input_data,
    python_script_path=python_script_path_sum,
    dtype="uint8"
)

```

**Python - Worker**

```python
import numpy as np
from lib.process_with_mmap import process_via_mmap

@process_via_mmap
def sum_mmap(input_data):
    return np.sum(input_data)


if __name__ == "__main__":
    sum_mmap()
```

---

### 2. mmap syscall

`mmap` (memory map) is a **POSIX system call** that allows a file or a memory region to be mapped directly into a process’s virtual address space. Once mapped, the file can be accessed like regular memory, without the need for explicit `read` or `write` system calls.

Conceptually, `mmap` creates a direct association between a file and the process memory. The operating system transparently manages page loading and synchronization between memory and the underlying file, loading pages on demand and flushing modifications when required.

#### 2.1 mmap as an IPC mechanism

In the context of inter-process communication (IPC), `mmap` is particularly efficient because:

- it allows **multiple processes to share the same memory region**;
- it avoids redundant data copies between kernel space and user space;
- it significantly reduces overhead compared to pipes, sockets, or message-based IPC.

Two independent processes can map the same file—commonly located in a shared filesystem such as `/dev/shm`—and exchange data by directly reading from and writing to the mapped memory. Synchronization is application-defined and typically implemented using lightweight primitives such as flags, mutexes, or spinlocks.

#### 2.2 Advantages over traditional R-Python communication

Conventional R–Python interoperability mechanisms often rely on:

- serialization formats (JSON, pickle, Feather, Parquet);
- intermediate processes or language bindings (e.g., `reticulate`);
- full data copies between runtimes.

While convenient, these approaches introduce non-trivial costs, especially for large datasets:

- expensive type conversions;
- increased latency;
- higher memory consumption.

By contrast, PyRMap uses `mmap` to:

- transfer data **only once** into a shared, memory-mapped file;
- allow both R and Python to operate directly on the same data buffer;
- eliminate intermediate serialization and deserialization steps.

From a performance standpoint, this model closely resembles direct in-memory access.

#### 2.3 The role of `/dev/shm`

In PyRMap’s default configuration, memory-mapped files are created under `/dev/shm`, a RAM-backed temporary filesystem (`tmpfs`). This provides several advantages:

- memory-level access speeds;
- no disk I/O overhead;
- automatic cleanup on system reboot.

For scenarios where data size exceeds available RAM or persistence is required, PyRMap also supports mapping files on disk, trading some performance for capacity and durability.

#### 2.4 Why mmap fits PyRMap

`mmap` aligns naturally with PyRMap’s design goals:

- **high performance** through zero-copy data access;
- **explicit control** over data layout and synchronization;
- **portability** across POSIX-compliant systems;
- **conceptual simplicity**, relying on files, shared memory, and minimal coordination.

In PyRMap, `mmap` is not merely an implementation detail but the **core abstraction** that enables fast, predictable, and extensible communication between R and Python processes.

---

### 3. PyRMap workflow

The core idea behind PyRMap is intentionally simple.  
The R process imports the `run_python.R` library, which exposes the following functions:

- `run_python`
- `run_python_pipeline`
- `run_python_shared_data`

These functions accept the following arguments:

- `data` – the data to be shared with the Python process
- `python_script_paths` – path(s) to the Python script(s) to be executed
- `dtype` – data type of the shared data (this argument will be removed in future versions and inferred automatically)
- `path` – specifies whether data sharing should be done purely in RAM or backed by disk
- `required_intermediate_results` – pipeline-only flag indicating whether intermediate results should be collected

### Execution steps

1. **Metadata file creation**  
   The R process first creates the metadata file.  
   This file acts both as a synchronization mechanism and as a descriptor for the shared data.  
   Its structure is described in Section 4.

2. **Data file creation**  
   The data file is then created and memory-mapped.  
   Conceptually, this file represents a contiguous memory buffer into which the input data is written sequentially.

3. **Python process spawn**  
   Using the `processx` library, the R process spawns a new Python process and executes the target Python script.

4. **Python-side execution**  
   The Python process:
   - reads the metadata file to determine data location, size, and type;
   - maps the data file into its address space;
   - executes the user-defined logic;
   - writes the result into a result file using the same data type as the input.

5. **Result retrieval**  
   Control returns to the R process, which memory-maps and reads the result file.  
   Temporary files are then cleaned up according to the selected storage mode.

![PyRMap Workflow](https://i.ibb.co/zHVXjQZy/Untitled-Diagram-drawio-1.jpg)

---

### 4. Metadata File Structure

The metadata file is a **core component** of this protocol. It plays a dual role, functioning both as a mutex and as a pointer:

- as a mutex, it uses a READY flag to synchronize access;
- as a pointer, it provides the location of the data and result binary files.

The metadata file has the following structure:

- 4 bytes → mutex flag
- 4 bytes → data file size
- 4 bytes → data type
- 4 bytes → location flag (RAM or DISK)
- 4 bytes → result file size

The metadata file itself is shared using mmap. In practice, this does not bring significant overhead, since the file size is minimal—only 20 bytes when sharing a single data element of a given type.

When multiple data types or multiple variables need to be shared, the current solution is to use an S3 object. PyRMap provides native support for sharing S3 objects, as described in Section 5.3. In this case, an additional metadata file is required, with the following layout:
The S3 metadata file is structured as follows:

**Fixed header:**

- 4 bytes → header text
- 2 bytes → version
- 2 bytes → S3 object attributes count

**Repeated for each attribute:**

- 2 bytes → attribute name length
- n bytes → attribute name
- 2 bytes → attribute data type
- m bytes → attribute value

Here, n represents the number of bytes used for the attribute name, while m represents the number of bytes used for the attribute value.

---

### 5. Other Functionalities

#### 5.1 Multiple calls with one data file

PyRMap allows users to reuse the **same data file across multiple independent executions**. This approach reduces overall memory consumption and improves processing performance by avoiding unnecessary data duplication.

The current implementation of this feature is intentionally simple. It relies on a for loop that iterates over a list of Python script paths, reusing the same metadata file at each iteration. While effective, this approach is sequential.

With additional development effort, this mechanism could be extended to support parallel execution, which would further reduce the total execution time.

Below is the implementation of the _run_python_shared_data_ function:

```r
run_python_shared_data <- function(data, python_scripts_paths, dtype="float32", path="RAM") {
    library(processx)
    results <- c()

    RESULT_FILE = get_result_file_path(path)

    input_size <- length(data)
    metadata_flag_edit_w(0)
    dtype_size <- get_size_per_type(dtype)
    data_file_cw(data, dtype_size*input_size, dtype, path)

    for (python_script_path in python_scripts_paths) {
        processx::run("python3", args = python_script_path, env=c(SHM_DIR="/dev/shm", Sys.getenv()))

        result <- result_file_r(dtype, path)
        results <- c(results, result)
        file.remove(RESULT_FILE)

        metadata_flag_edit_w(0)
    }

    cleanup(path)
    return(results)
}
```

#### 5.2 R - Python pipeline

The Python **pipeline execution process**, is quite similar with the multiple calls one, but in this case, the result from one process, became the data for the next one. This allows the user to make his code more modular, easier to debug and understand.

Below is the implementation of the _run_python_pipeline_ function:

```r
run_python_pipeline <- function(initial_data, python_scripts_paths, dtype="float32", path="RAM", required_intermediate_results=FALSE) {
    library(processx)
    initial_input_size <- length(initial_data)

    DATA_FILE = get_data_file_path(path)
    RESULT_FILE = get_result_file_path(path)

    dtype_size <- get_size_per_type(dtype)
    metadata_file_cw(initial_input_size, dtype, path)
    data_file_cw(initial_data, dtype_size*initial_input_size, dtype, path)

    if (isTRUE(required_intermediate_results)) {
        results <- c()
    }

    for (python_script_path in python_scripts_paths) {
        processx::run("python3", args = python_script_path)
        result <- result_file_r(dtype, path)

        if (isTRUE(required_intermediate_results)) {
            results <- c(results, result)
        }

        file.remove(METADATA_FILE)

        temp_data_file_size <- length(result)
        metadata_file_cw(temp_data_file_size, dtype, path)
        file.rename(RESULT_FILE, DATA_FILE)
    }

    cleanup(path)

    if (isTRUE(required_intermediate_results)) {
        return(results)
    }

    return(result)
}
```

#### 5.3 Sharing S3 object

One of the newest features of this protocol is **S3 object sharing**. This functionality allows users to share an object directly, containing multiple variables of different types. In Python, the shared S3 object is represented as a GenericRS3 object, which mirrors the structure and variables of the original R object.

Below is the Python function responsible for transforming the shared S3 object into a GenericRS3 instance, which is PyRMap’s internal representation of an S3 object.

```python
def read_and_create_s3_object():
    generic_r_s3 = GenericRS3()

    with open("/dev/shm/data.bin", "rb") as f:
        mm = mmap.mmap(f.fileno(), 0, access = mmap.ACCESS_READ)
        pos = 0

        magic = mm[pos:pos+4].decode("ascii")
        pos += 4

        version, = struct.unpack_from("<H", mm, pos)
        pos += 2

        attr_count, = struct.unpack_from("<H", mm, pos)
        pos += 2


        for i in range(attr_count):

            name_len, = struct.unpack_from("<H", mm, pos)
            pos += 2

            name = mm[pos:pos+name_len].decode("ascii")
            pos += name_len

            dtype_value, = struct.unpack_from("<H", mm, pos)
            pos += 2

            if dtype_value == 1:
                dtype_size = 4
                struct_unpack_sign = 'i'
            elif dtype_value == 2:
                dtype_size = 8
                struct_unpack_sign = 'd'
            else:
                raise ValueError(f"dype is not a valid type")

            value,  = struct.unpack_from(f"<{struct_unpack_sign}", mm, pos)
            pos += dtype_size


            setattr(generic_r_s3, name, value)

    return generic_r_s3
```

---

### 6. Resources

- [PyRMap source code](https://github.com/py39cptCiolacu/pyrmap)
- [mmap docs](https://man7.org/linux/man-pages/man2/mmap.2.html)
- [IPC video](https://www.youtube.com/watch?v=Y2mDwW2pMv4&t=468s)
- [Virtual Memory Mini Course](https://www.youtube.com/watch?v=fGP6VHxqkIM&list=PL38NNHQLqJqZoDp4CrAueD1aBin7OebEL)

```

```
