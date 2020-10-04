import React, { useState, createContext, useEffect } from "react";

const themeColours = {
  dark: {
    colorTitle: "rgb(133, 150, 165,0.2)",
    color: "rgb(133, 150, 165)",
    backgroundColor: "#010A16",
    foregroundHeaderColor: "#0b1622",
    foregroundBodyColor: "#151f2e",
    colorArrow: "#0b1622",
  },
  light: {
    colorArrow: "#c9c9c9",
    color: "#343434",
    backgroundColor: "#f0f0f0",
    foregroundBodyColor: "white",
    foregroundHeaderColor: "#c9c9c9",
    colorTitle: "rgb(52, 52, 52,0.2)",
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeName = "light" | "dark";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType>(undefined!);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentTheme =
    localStorage.getItem("fsoweb.todo") &&
    localStorage.getItem("fsoweb.todo") === "dark"
      ? "dark"
      : "light";

  const [themeName, setThemeName] = useState<ThemeName>(currentTheme);

  const setTheme = (name: ThemeName) => {
    document.body.style.setProperty("--color", themeColours[name].color);
    document.body.style.setProperty(
      "--background-color",
      themeColours[name].backgroundColor
    );
    document.body.style.setProperty(
      "--foreground-body-color",
      themeColours[name].foregroundBodyColor
    );
    document.body.style.setProperty(
      "--foreground-header-color",
      themeColours[name].foregroundHeaderColor
    );
    document.body.style.setProperty(
      "--color-title",
      themeColours[name].colorTitle
    );
    document.body.style.setProperty(
      "--color-arrow",
      themeColours[name].colorArrow
    );

    setThemeName(name);
  };

  useEffect(() => {
    //const darkOS = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // setTheme(darkOS ? "dark" : "light");
    setTheme(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
