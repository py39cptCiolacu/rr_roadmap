import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import posts from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Typography>Article not found</Typography>;

  return (
    <>
      <Navbar />
      {/* Fundal gri deschis */}
      <Box
        sx={{
          backgroundColor: "#f0f2f5", // gri deschis
          minHeight: "100vh", // să acopere tot ecranul
          py: 4, // padding vertical
        }}
      >
        <Box sx={{ p: { xs: 2, md: 8 }, maxWidth: "800px", mx: "auto" }}>
          <Paper sx={{ p: 4, borderRadius: "16px" }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#20445e" }}>
              {post.title}
            </Typography>
            <Typography sx={{ color: "#20445e", opacity: 0.7 }}>
              {post.author}
            </Typography>
            <Typography sx={{ mb: 3, color: "#20445e", opacity: 0.7 }}>
              {post.date}
            </Typography>
            <Typography
              component="div"
              sx={{
                color: "#20445e",
                lineHeight: 1.8,
                "& h2": { mt: 4, mb: 2 },
                "& h3": { mt: 3, mb: 1.5 },
                "& p": { mb: 2 },
                "& ul": { pl: 3, mb: 2 },
                "& li": { mb: 1 },
                "& code": {
                  backgroundColor: "#f4f6f8",
                  px: 0.5,
                  borderRadius: "4px",
                  fontFamily: "monospace",
                },
                "& blockquote": {
                  borderLeft: "4px solid #ccc",
                  pl: 2,
                  color: "#555",
                  fontStyle: "italic",
                },
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSlug]}
                components={{
                  img: ({ node, ...props }) => (
                    <Box
                      component="img"
                      {...props}
                      sx={{
                        display: "block",
                        mx: "auto",
                        width: "100%",
                        maxWidth: 700,
                        height: "auto",
                        mb: 3,
                      }}
                    />
                  ),
                  a: ({ node, href, ...props }) => {
                    // Dacă e link intern (hash), fac scroll
                    if (href && href.startsWith("#")) {
                      const handleClick = (e) => {
                        e.preventDefault();
                        const targetId = href.replace("#", "");
                        const element = document.getElementById(targetId);
                        if (element)
                          element.scrollIntoView({ behavior: "smooth" });
                      };
                      return (
                        <a
                          {...props}
                          href={href}
                          onClick={handleClick}
                          style={{ color: "#1a73e8", cursor: "pointer" }}
                        />
                      );
                    }

                    // Link extern → deschide normal
                    return (
                      <a
                        {...props}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1a73e8" }}
                      />
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
