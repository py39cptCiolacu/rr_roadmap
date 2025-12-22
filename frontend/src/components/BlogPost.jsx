import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper } from "@mui/material";
import { posts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Typography>Article not found</Typography>;

  return (
    <>
      <Navbar />
      <Box sx={{ p: { xs: 2, md: 8 }, maxWidth: "800px", mx: "auto" }}>
        <Paper sx={{ p: 4, borderRadius: "16px" }}>
          <Typography variant="h4" sx={{ mb: 2, color: "#20445e" }}>
            {post.title}
          </Typography>
          <Typography sx={{ mb: 3, color: "#20445e", opacity: 0.7 }}>
            {post.date}
          </Typography>
          <Typography sx={{ color: "#20445e", lineHeight: 1.7 }}>
            {post.content}
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
