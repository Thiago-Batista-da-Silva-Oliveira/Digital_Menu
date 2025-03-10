// src/store/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  resetColors: () => void;
}

const defaultPrimaryColor = '#FF6B00'; // Orange as seen in the image
const defaultSecondaryColor = '#F5F5F5'; // Light gray

const ThemeContext = createContext<ThemeContextType>({
  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  resetColors: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ 
  children: React.ReactNode;
  initialPrimaryColor?: string;
  initialSecondaryColor?: string;
}> = ({ 
  children, 
  initialPrimaryColor = defaultPrimaryColor,
  initialSecondaryColor = defaultSecondaryColor 
}) => {
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState(initialSecondaryColor);

  // Apply colors to CSS variables when they change
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [primaryColor, secondaryColor]);

  const resetColors = () => {
    setPrimaryColor(defaultPrimaryColor);
    setSecondaryColor(defaultSecondaryColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
        resetColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};