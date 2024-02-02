import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
// Création
const ThemeContext = createContext();

// Contenu
export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("#root").classList.add("dark");
    } else {
      document.querySelector("#root").classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = () => {
    const currentTheme = theme === "light" ? "dark" : "light";

    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
  };

  const themeContextValues = useMemo(
    () => ({ theme, handleThemeChange }),
    [theme, handleThemeChange]
  );

  return (
    <ThemeContext.Provider value={themeContextValues}>
      {children}
    </ThemeContext.Provider>
  );
}

// Utilisation
export const useTheme = () => useContext(ThemeContext);

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
