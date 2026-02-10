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
import MenuMui from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/rr_logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [docsAnchor, setDocsAnchor] = useState(null);
  const openDocs = Boolean(docsAnchor);

  const navItems = [
    { label: "Roadmap", path: "/" },
    { label: "RR-Sandbox", path: "/sandbox" },
    {
      label: "Docs",
      path: "/docs",
      children: [
        { label: "Get Started with RR", path: "/docs/get-started" },
        { label: "Opcodes Table", path: "/docs/opcodes" },
        // { label: "API Docs", path: "/docs/api" },
      ],
    },
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
            {navItems.map((item) =>
              item.children ? (
                <Box key={item.label}>
                  <Button
                    onClick={(e) => setDocsAnchor(e.currentTarget)}
                    sx={{
                      color: "#fff",
                      fontFamily: "JetBrains Mono",
                      borderBottom: location.pathname.startsWith("/docs")
                        ? "2px solid #f5b025"
                        : "2px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    {item.label}
                  </Button>

                  <MenuMui
                    anchorEl={docsAnchor}
                    open={openDocs}
                    onClose={() => setDocsAnchor(null)}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.path}
                        component={Link}
                        to={child.path}
                        onClick={() => setDocsAnchor(null)}
                        sx={{ fontFamily: "JetBrains Mono" }}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                  </MenuMui>
                </Box>
              ) : (
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
                  }}
                >
                  {item.label}
                </Button>
              )
            )}
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
              <Box key={item.label}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={() => !item.children && setOpen(false)}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontFamily: "JetBrains Mono",
                        fontWeight: location.pathname.startsWith(item.path)
                          ? 700
                          : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>

                {item.children && (
                  <List sx={{ pl: 3 }}>
                    {item.children.map((child) => (
                      <ListItem key={child.path} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={child.path}
                          onClick={() => setOpen(false)}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontFamily: "JetBrains Mono",
                              fontSize: "0.9rem",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
