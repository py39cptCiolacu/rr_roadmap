import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // import MUI ThemeProvider
import theme from "./theme"; // import theme-ul pe care l-ai creat

import Roadmap from "./pages/Roadmap";
import Sandbox from "./pages/Sandbox";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Roadmap />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Optional: catch-all pentru 404 */}
          <Route path="*" element={<Roadmap />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
