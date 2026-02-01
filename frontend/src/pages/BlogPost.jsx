import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import posts from "../data/posts";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!post) return;

    fetch(post.content)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => {
        console.error("Failed to load markdown:", err);
        setContent("Failed to load content.");
      });
  }, [post]);

  useEffect(() => {
    // inițializează toate diagramele mermaid după render
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
  }, [content]);

  if (!post) return <Typography>Article not found</Typography>;

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
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
                  borderRadius: 4,
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
                  h2: ({ node, ...props }) => (
                    <Typography
                      component="h2"
                      id={node.data?.id || undefined}
                      sx={{ mt: 4, mb: 2, fontSize: "2rem", fontWeight: 700 }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <Typography
                      component="h3"
                      id={node.data?.id || undefined}
                      sx={{
                        mt: 3,
                        mb: 1.5,
                        fontSize: "1.5rem",
                        fontWeight: 600,
                      }}
                      {...props}
                    />
                  ),
                  a: ({ href, ...props }) => {
                    if (href?.startsWith("#")) {
                      const handleClick = (e) => {
                        e.preventDefault();
                        const el = document.getElementById(
                          href.replace("#", ""),
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
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
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "text";

                    // MERMAID
                    if (!inline && language === "mermaid") {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 4,
                          }}
                        >
                          <Box sx={{ mb: 3 }}>
                            <div className="mermaid">{String(children)}</div>
                          </Box>
                        </Box>
                      );
                    }

                    // BLOCK CODE
                    if (!inline && match) {
                      return (
                        <Box sx={{ mb: 3 }}>
                          <Box
                            sx={{
                              backgroundColor: "#2d2d2d",
                              color: "#fff",
                              px: 1,
                              py: 0.3,
                              borderTopLeftRadius: 4,
                              borderTopRightRadius: 4,
                              fontSize: "0.75rem",
                              fontFamily: "monospace",
                              textTransform: "uppercase",
                            }}
                          >
                            {language}
                          </Box>
                          <SyntaxHighlighter
                            style={oneDark}
                            language={language}
                            PreTag="div"
                            customStyle={{
                              borderRadius: "0 0 8px 8px",
                              margin: 0,
                              padding: "1rem",
                              overflowX: "auto",
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </Box>
                      );
                    }

                    // COD INLINE
                    return (
                      <Box
                        component="code"
                        sx={{
                          backgroundColor: "#f4f6f8",
                          px: 0.5,
                          borderRadius: 4,
                          fontFamily: "monospace",
                        }}
                        {...props}
                      >
                        {children}
                      </Box>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
