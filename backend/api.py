
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import datetime
import tempfile
import os

app = Flask(__name__)
CORS(app)
RR_PATH = "rr_roadmap/rr_source/rr-source"

@app.route("/ping", methods=["GET", "OPTIONS"])
def ping():
    if request.method == "OPTIONS":
        return "", 200
    return "pong"

@app.route("/run_rr_code", methods=["POST"])
def run_rr_code():
    data = request.get_json()
    code = data.get("code", "")
    bytecode_flag = data.get("bytecode", False)

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    temp_filename = f"temp_{timestamp}"
    temp_path = os.path.join(tempfile.gettempdir(), temp_filename)

    with open(temp_path, "w") as f:
        f.write(code)

    # run program
    args = [RR_PATH, temp_path]
    if bytecode_flag:
        args.append("--bytecode")

    try:
        result = subprocess.run(
            args,
            capture_output=True,
            text=True,
            timeout=30   # <----- LIMITA DE TIMP
        )
    except subprocess.TimeoutExpired:
        return jsonify({
        "temp_file": "",
        "stdout": "",
        "stderr": "TIMEOUT ERROR",
        "bytecode": "",
        "result": "",
    })

    stdout = result.stdout or ""

    bytecode_block = ""
    result_text = stdout

    if bytecode_flag:
        lines = stdout.splitlines()

        # găsim indexul "BYTECODE" și "BYTECODE END"
        try:
            start = lines.index("BYTECODE")
            end = lines.index("BYTECODE END")
        except ValueError:
            start = end = -1

        if start != -1 and end != -1 and end > start:
            bytecode_block = "\n".join(lines[start+1:end])

            result_text = "\n".join(lines[end+1:]).strip()

    return jsonify({
        "temp_file": temp_path,
        "stdout": stdout,
        "stderr": result.stderr or "",
        "bytecode": bytecode_block,
        "result": result_text,
    })
