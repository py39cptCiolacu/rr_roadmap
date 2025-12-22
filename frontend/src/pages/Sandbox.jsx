import { useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Paper, Typography, FormControlLabel, Switch } from "@mui/material";
import Editor from "@monaco-editor/react";

export default function RRSandbox() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [bytecode, setBytecode] = useState("");
  const [showBytecode, setShowBytecode] = useState(false);

  const runCode = async () => {
    try {
      const response = await fetch("https://rrsource.pythonanywhere.com//run_rr_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, bytecode: showBytecode }),
      });

      const data = await response.json();
      setOutput(`STDOUT:\n${data.result}\n\nSTDERR:\n${data.stderr}`);
      setBytecode(data.bytecode || "");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "90vh", p: 2, gap: 2 }}>
        {/* Code Input */}
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 2,
            borderRadius: "12px",
            border: "2px solid #20455f",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography sx={{ mb: 1, color: "#20455f", fontWeight: 700 }}>Code Input</Typography>
          <Editor
            height="100%"
            defaultLanguage="r"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{ fontSize: 14, lineNumbers: "on", minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: "on" }}
          />
          <Button sx={{ mt: 2, backgroundColor: "#20455f", color: "#ffffff", '&:hover': { backgroundColor: '#1b3b50' } }} onClick={runCode}>Run</Button>
          <FormControlLabel
            sx={{ mt: 1 }}
            control={<Switch checked={showBytecode} onChange={(e) => setShowBytecode(e.target.checked)} />}
            label="Show Bytecode"
          />
        </Paper>

        {/* Output + Bytecode */}
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 2,
            borderRadius: "12px",
            border: "2px solid #20455f",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography sx={{ mb: 1, color: "#20455f", fontWeight: 700 }}>Output</Typography>
            <Paper sx={{ flex: 1, p: 2, backgroundColor: "#1e1e1e", color: "#ffffff", overflow: "auto", fontFamily: "monospace" }}>
              <pre>{output}</pre>
            </Paper>
          </Box>

          {showBytecode && (
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Typography sx={{ mb: 1, color: "#20455f", fontWeight: 700 }}>Bytecode</Typography>
              <Paper sx={{ flex: 1, p: 2, backgroundColor: "#1e1e1e", color: "#00e676", overflow: "auto", fontFamily: "monospace" }}>
                <pre>{bytecode}</pre>
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
}
