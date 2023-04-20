import { createContext } from "react";

export const theme = {
  background: "#ffffff",
  primary: "#000",
  hintText: "#000",
};

export type Theme = typeof theme;

export const ThemeContext = createContext(theme);
