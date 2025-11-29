import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import logo from "../assets/rr_logo.png"

export default function Navbar() {
  return (
    <AppBar position="static"
    style={{backgroundColor: "#20455f"}}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <Typography variant="h6">
            RR Interpreter
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Roadmap
          </Button>

          <Button color="inherit" component={Link} to="/sandbox">
            RR-Sandbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

