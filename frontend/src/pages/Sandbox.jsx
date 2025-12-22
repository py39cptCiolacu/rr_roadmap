import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Editor from "@monaco-editor/react";

// Import examples JSON
import examples from "../assets/examples.json";

export default function RRSandbox() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [bytecode, setBytecode] = useState("");
  const [showBytecode, setShowBytecode] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);

  const runCode = async () => {
    try {
      const response = await fetch(
        "https://rrsource.pythonanywhere.com/run_rr_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code, bytecode: showBytecode }),
        }
      );

      const data = await response.json();
      setOutput(`STDOUT:\n${data.result}\n\nSTDERR:\n${data.stderr}`);
      setBytecode(data.bytecode || "");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  const loadExample = (exampleCode) => {
    setCode(exampleCode);
    setExamplesOpen(false);
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
            gap: 2,
            minHeight: 0,
          }}
        >
          {/* Header with Examples button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#20455f", fontWeight: 700 }}>
              Code Input
            </Typography>

            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "#20455f", color: "#20455f" }}
              onClick={() => setExamplesOpen(true)}
            >
              Examples
            </Button>
          </Box>

          {/* Monaco Editor */}
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

          <Button
            sx={{
              mt: 1,
              backgroundColor: "#20455f",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#1b3b50" },
            }}
            onClick={runCode}
          >
            Run
          </Button>

          <FormControlLabel
            control={
              <Switch
                checked={showBytecode}
                onChange={(e) => setShowBytecode(e.target.checked)}
              />
            }
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
            }}
          >
            <Typography sx={{ color: "#20455f", fontWeight: 700 }}>
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
                minHeight: 0,
              }}
            >
              <pre style={{ margin: 0 }}>{output}</pre>
            </Paper>
          </Box>

          {showBytecode && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
              }}
            >
              <Typography sx={{ color: "#20455f", fontWeight: 700 }}>
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
                  minHeight: 0,
                }}
              >
                <pre style={{ margin: 0 }}>{bytecode}</pre>
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Examples Modal */}
      <Dialog
        open={examplesOpen}
        onClose={() => setExamplesOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Examples</DialogTitle>

        <DialogContent>
          <List>
            {examples.map((ex, idx) => (
              <ListItemButton key={idx} onClick={() => loadExample(ex.code)}>
                <ListItemText primary={ex.title} secondary={ex.description} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
