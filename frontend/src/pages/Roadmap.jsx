import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Github } from "lucide-react";
import { Paper, Typography, Box } from "@mui/material";

export default function Roadmap() {
  const cardStyle = {
    p: { xs: 2.5, md: 4 },
    borderRadius: "16px",
    border: "2px solid #20445e",
    backgroundColor: "#fefcf8",
    boxShadow: 3,
    mb: 4,
    overflow: "hidden",
    fontFamily: '"Verdana", sans-serif', // <- aici
  };

  const titleStyle = {
    mb: 2,
    fontWeight: 700,
    color: "#20445e",
    fontSize: { xs: "1.25rem", md: "1.5rem" },
    fontFamily: '"Verdana", sans-serif', // <- aici
  };

  const listItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 1,
    color: "#20445e",
    mb: 1,
    fontSize: { xs: "0.95rem", md: "1rem" },
    fontFamily: '"Verdana", sans-serif', // <- aici
  };

  const iconStyle = {
    flexShrink: 0,
    marginTop: "2px",
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, md: 8 },
          maxWidth: "960px",
          mx: "auto",
        }}
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontFamily: '"Verdana", sans-serif', // <- aici
            color: "#20445e",
            flexWrap: "wrap",
          }}
        >
          <Sparkles style={{ width: 26, height: 26, color: "#f5b025" }} />
          RR Interpreter Roadmap
        </motion.h1>

        {/* GitHub Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Paper
            sx={{
              p: { xs: 2.5, md: 3 },
              mb: 6,
              borderRadius: "16px",
              border: "2px solid #20445e",
              backgroundColor: "#ffffff",
              boxShadow: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Github size={32} color="#20445e" />
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#20445e" }}>
                  Open Source on GitHub
                </Typography>
                <Typography sx={{ color: "#20445e", opacity: 0.8 }}>
                  Explore the RR interpreter source code
                </Typography>
              </Box>
            </Box>

            <Box
              component="a"
              href="https://github.com/py39cptCiolacu/rr"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                boxSizing: "border-box",
                maxWidth: "100%",
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#20445e",
                px: 3,
                py: 1.2,
                borderRadius: "999px",
                fontWeight: 600,
                fontFamily: '"Verdana", sans-serif', // fontul dorit
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#163347",
                },
              }}
            >
              View Repository <ArrowRight size={18} />
            </Box>
          </Paper>

          {/* About RR */}
          <Paper sx={cardStyle}>
            <Typography sx={titleStyle}>About RR</Typography>
            <Typography sx={{ color: "#20445e", lineHeight: 1.7 }}>
              RR is an experimental R interpreter built using RPython — which
              also inspired its name. Its mission is to deliver a lightweight
              yet powerful interpreter for the R language while enabling
              seamless, native-level integration with Python.
            </Typography>
          </Paper>

          {/* Implemented */}
          <Paper sx={cardStyle}>
            <Typography sx={titleStyle}>What Is Already Implemented</Typography>
            {[
              "Support for basic data types: integer, numeric, bool",
              "Basic arithmetic operations: +, -, /, *",
              "Logical operations: &&, ||",
              "if/else statements",
              "while loops",
              "Assignment operators",
              "print function",
            ].map((item, idx) => (
              <Box key={idx} sx={listItemStyle}>
                <CheckCircle size={18} color="#f5b025" style={iconStyle} />
                {item}
              </Box>
            ))}
          </Paper>

          {/* Upcoming */}
          <Paper sx={cardStyle}>
            <Typography sx={titleStyle}>Upcoming Features</Typography>
            {[
              "Support for complex numbers and strings",
              "for loops",
              "Vector operations",
              "User-defined functions",
              "JIT compilation",
              "Native Python call integration",
            ].map((item, idx) => (
              <Box key={idx} sx={listItemStyle}>
                <ArrowRight size={18} color="#f5b025" style={iconStyle} />
                {item}
              </Box>
            ))}
          </Paper>
        </motion.div>
      </Box>
    </>
  );
}
