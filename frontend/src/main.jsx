import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roadmap from "./pages/Roadmap.jsx";
import Sandbox from "./pages/Sandbox.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Roadmap />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
