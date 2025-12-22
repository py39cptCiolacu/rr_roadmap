import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Paper, Typography, Box } from "@mui/material";
import { Github } from "lucide-react";

export default function Roadmap() {
  const cardStyle = {
    p: 4,
    borderRadius: "16px",
    border: "2px solid #20445e",
    backgroundColor: "#fefcf8",
    boxShadow: 3,
    mb: 4,
  };

  const titleStyle = {
    mb: 2,
    fontWeight: 700,
    color: "#20445e",
  };

  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    color: "#20445e",
    mb: 1,
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 8, maxWidth: "960px", mx: "auto" }}>
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2rem", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '2.5rem', color: '#20445e' }}
        >
          <Sparkles style={{ width: 28, height: 28, color: '#f5b025' }} /> RR Interpreter Roadmap
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Paper
            sx={{
              p: 3,
              mb: 6,
              borderRadius: "16px",
              border: "2px solid #20445e",
              backgroundColor: "#ffffff",
              boxShadow: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
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
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#20445e",
                px: 3,
                py: 1.2,
                borderRadius: "999px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#163347",
                },
              }}
            >
              View Repository <ArrowRight size={18} />
            </Box>
          </Paper>
        </motion.div>

        {/* Section 1 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={cardStyle}>
            <Typography variant="h5" sx={titleStyle}>About RR</Typography>
            <Typography sx={{ color: '#20445e', lineHeight: 1.6 }}>
              RR is an experimental R interpreter built using RPython — which also inspired its name. Its mission is to deliver a lightweight yet powerful interpreter for the R language while enabling seamless, native-level integration with Python. By blending RPython's performance features with Python's extensive ecosystem, RR aims to become a modern bridge between statistical computing and general-purpose development.
            </Typography>
          </Paper>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Paper sx={cardStyle}>
            <Typography variant="h5" sx={titleStyle}>What Is Already Implemented</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {["Support for basic data types: integer, numeric, bool", "Basic arithmetic operations: +, -, /, *", "if/else statements", "while loops", "Assignment operators", "print function"].map((item, idx) => (
                <Box key={idx} sx={listItemStyle}>
                  <CheckCircle style={{ color: '#f5b025', marginRight: '8px' }} /> {item}
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Paper sx={cardStyle}>
            <Typography variant="h5" sx={titleStyle}>Upcoming Features</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {["Support for complex numbers and strings", "for loops", "Vector operations", "User-defined functions", "JIT compilation", "Native Python call integration"].map((item, idx) => (
                <Box key={idx} sx={{ ...listItemStyle, color: '#20445e' }}>
                  <ArrowRight style={{ color: '#f5b025', marginRight: '8px' }} /> {item}
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.section>
      </Box>
    </>
  );
}
