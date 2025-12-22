import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, PenLine } from "lucide-react";
import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogList() {
  const cardStyle = {
    p: 4,
    borderRadius: "16px",
    border: "2px solid #20445e",
    backgroundColor: "#fefcf8",
    boxShadow: 3,
    mb: 4,
    transition: "all 0.25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6,
    },
  };

  const titleStyle = {
    fontWeight: 700,
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
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            fontSize: "2.5rem",
            color: "#20445e",
          }}
        >
          <PenLine size={28} color="#f5b025" />
          RR Blog
        </motion.h1>

        {/* Blog posts */}
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Paper sx={cardStyle}>
              <Typography variant="h5" sx={titleStyle}>
                {post.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  color: "#20445e",
                  opacity: 0.7,
                }}
              >
                <Calendar size={16} />
                <Typography variant="body2">{post.date}</Typography>
              </Box>

              <Typography
                sx={{
                  color: "#20445e",
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {post.excerpt}
              </Typography>

              {post.published ? (
                <Box
                  component={Link}
                  to={`/blog/${post.slug}`}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 600,
                    color: "#20445e",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Read more <ArrowRight size={16} />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 600,
                    color: "#20445e",
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                >
                  To be published
                </Box>
              )}
            </Paper>
          </motion.div>
        ))}
      </Box>
    </>
  );
}
