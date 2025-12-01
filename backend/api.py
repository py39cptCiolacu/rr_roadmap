from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import subprocess, datetime, tempfile, os

app = Flask(
    __name__,
    static_folder="../frontend/dist",   # schimbă în build dacă e cazul
    static_url_path="/"
)

# NU mai avem nevoie de CORS pentru localhost:5173
CORS(app)

RR_PATH = "rr_source/rr-source"

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
    
    result = subprocess.run(
        args,
        capture_output=True,
        text=True
    )

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


# --------------------------
# SERVIRE FRONTEND
# --------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True)
