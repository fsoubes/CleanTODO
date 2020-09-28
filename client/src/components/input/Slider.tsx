import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

export const Slider: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <label id="switch" className="switch">
      <input
        type="checkbox"
        onChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          localStorage.setItem(
            "fsoweb.todo",
            theme === "dark" ? "light" : "dark"
          );
        }}
      ></input>
      <span className="slider round"></span>
    </label>
  );
};
