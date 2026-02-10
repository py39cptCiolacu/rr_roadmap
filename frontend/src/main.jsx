import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // import MUI ThemeProvider
import theme from "./theme"; // import theme-ul pe care l-ai creat

import Roadmap from "./pages/Roadmap";
import Sandbox from "./pages/Sandbox";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import DocsOpcodes from "./pages/docs/DocsOpcodes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Roadmap />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/docs/opcodes" element={<DocsOpcodes />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Optional: catch-all pentru 404 */}
          <Route path="*" element={<Roadmap />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
