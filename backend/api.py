from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RR_PATH = "/home/rr/rr-source"

class InputData(BaseModel):
    code: str

@app.post("/run_rr_code")
def run_rr_code(data: InputData):
    import subprocess, datetime, tempfile, os
    
    print(data)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    temp_filename = f"temp_{timestamp}"
    temp_path = os.path.join(tempfile.gettempdir(), temp_filename)

    with open(temp_path, "w") as f:
        f.write(data.code)
    
    result = subprocess.run([RR_PATH, temp_path], capture_output=True, text=True)

    return {
        "temp_file": temp_path,
        "stdout": result.stdout,
        "stderr": result.stderr
    }