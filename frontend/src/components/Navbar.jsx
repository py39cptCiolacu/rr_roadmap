import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/rr_logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Roadmap", path: "/" },
    { label: "RR-Sandbox", path: "/sandbox" },
    { label: "Blog", path: "/blog" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#20455f" }}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            component={Link}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <img
              src={logo}
              alt="RR Logo"
              style={{ width: 36, height: 36, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              fontFamily="JetBrains Mono"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              RR Interpreter
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  fontFamily: "JetBrains Mono",
                  fontWeight: isActive(item.path) ? 700 : 400,
                  borderBottom: isActive(item.path)
                    ? "2px solid #f5b025"
                    : "2px solid transparent",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile menu button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  sx={{
                    fontFamily: "JetBrains Mono",
                    backgroundColor: isActive(item.path)
                      ? "rgba(32,69,95,0.1)"
                      : "transparent",
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 700 : 400,
                      color: "#20455f",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
