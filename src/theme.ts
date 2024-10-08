import { createContext, useContext } from "react";

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export const lightTheme: Theme = {
    primary: "#1a1a1a",
    secondary: "#646cff",
    background: "#ffffff",
    text: "#1a1a1a",
    accent: "#c7c7c7",
}

export const darkTheme: Theme = {
    primary: "#1a1a1a",
    secondary: "#646cff",
    background: "#1a1a1a",
    text: "#ffffff",
    accent: "#c7c7c76f",
}

export const ThemeContext = createContext<Theme>(lightTheme);

export const useTheme = () => useContext(ThemeContext);