import React, { createContext, useContext, useEffect, useState } from "react";
import { themes } from "../constants/theme";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  themeName: ThemeType;
  theme: typeof themes.dark;
  toggleTheme: () => void;
  setTheme: (t: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeName: "dark",
  theme: themes.dark,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeType>("dark");

  // Читай збережену тему або системну
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("APP_THEME");
      if (saved === "light" || saved === "dark") setThemeName(saved as ThemeType);
      else setThemeName(Appearance.getColorScheme() === "dark" ? "dark" : "light");
    })();
  }, []);

  // Збереження при зміні
  const setTheme = (t: ThemeType) => {
    setThemeName(t);
    AsyncStorage.setItem("APP_THEME", t);
  };

  const toggleTheme = () => setTheme(themeName === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ themeName, theme: themes[themeName], toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
