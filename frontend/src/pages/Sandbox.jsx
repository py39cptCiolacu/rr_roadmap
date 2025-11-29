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
      const response = await fetch("http://localhost:5000/run_rr_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, bytecode: showBytecode }),
      });

      const data = await response.json();
      console.log(data)
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
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>
            Code Input
          </Typography>
          <Editor
            height="100%"
            defaultLanguage="r"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              lineNumbers: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={runCode} style={{backgroundColor: "#20455f"}}> 
            Run
          </Button>
          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Switch
                checked={showBytecode}
                onChange={(e) => setShowBytecode(e.target.checked)}
              />
            }
            label="Show Bytecode"
          />
        </Box>

        {/* Output */}
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

        {/* Bytecode Section (Visible Only If Enabled) */}
        {showBytecode && (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Bytecode
            </Typography>
            <Paper
              sx={{
                flex: 1,
                p: 2,
                backgroundColor: "#1e1e1e",
                color: "#00e676",
                overflow: "auto",
                fontFamily: "monospace",
              }}
            >
              <pre>{bytecode}</pre>
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
}
