import { useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Paper, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";

export default function RRSandbox() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      console.log(code)
      const response = await fetch("http://localhost:8000/run_rr_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      });
      const data = await response.json();
      setOutput(`STDOUT:\n${data.stdout}\n\nSTDERR:\n${data.stderr}`);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "90vh", p: 2, gap: 2 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>
            Code Input
          </Typography>
          <Editor
            height="100%"
            defaultLanguage="r"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              lineNumbers: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={runCode}>
            Run
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>
            Output
          </Typography>
          <Paper
            sx={{
              flex: 1,
              p: 2,
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              overflow: "auto",
              fontFamily: "monospace",
            }}
          >
            <pre>{output}</pre>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
