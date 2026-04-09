/**
 * Color Mode (Light/Dark Theme) Helper
 * 
 * This gives us easy access to toggle between light and dark mode!
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

interface ColorModeProviderProps {
  children: ReactNode;
  initialColorMode?: ColorMode;
}

export function ColorModeProvider({ 
  children, 
  initialColorMode = 'light' 
}: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(initialColorMode);

  const toggleColorMode = () => {
    setColorModeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}

import React from 'react';

export default { ColorModeProvider, useColorMode };