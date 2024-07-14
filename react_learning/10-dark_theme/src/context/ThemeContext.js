import React, { createContext, useCallback, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../theme/theme';
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext();

function ThemeChangeProvider({ children }) {
  const LocalTheme = localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = themeMode === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  }, [themeMode]);

  return [themeMode, toggleTheme];
}

export { ThemeChangeProvider, useTheme };
