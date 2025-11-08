import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hook/useLocalStorageState";
/* eslint-disable react-refresh/only-export-components */
const DarkThemeContext = createContext();

function DarkThemeProvider({ children }) {
  const clientBg = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setisDarkMode] = useLocalStorageState(
    clientBg,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function setDarkMode() {
    setisDarkMode(true);
  }

  function setLightMode() {
    setisDarkMode(false);
  }

  function toggleMode() {
    setisDarkMode((open) => !open);
  
  }

  return (
    <DarkThemeContext.Provider
      value={{ isDarkMode, setDarkMode, setLightMode, toggleMode }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
}

function useDarkTheme() {
  const ctx = useContext(DarkThemeContext);

  if (ctx === undefined)
    throw new Error("useDarkTheme is call outside DarkThemeProvider!");

  return ctx;
}

export { useDarkTheme, DarkThemeProvider };
