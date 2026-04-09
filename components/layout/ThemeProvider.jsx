"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { darkTheme, lightTheme } from "../../utils/theme";

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <div
      style={{
        ...theme,
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <Navbar dark={dark} setDark={setDark} />
      {children}
      <Footer />
    </div>
  );
};

export default ThemeProvider;
