
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { ThemeName, ThemeOption, ThemeContextType } from '../types';
import { DEFAULT_THEME_OPTIONS } from '../constants';

const initialPrimaryColor = DEFAULT_THEME_OPTIONS[0].primaryColor; // Updated to use the first option which is now Eldium Indigo

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const storedTheme = localStorage.getItem('themeName') as ThemeName | null;
    // Default to light theme as per screenshot
    return storedTheme || 'light';
  });
  const [primaryColor, setPrimaryColorState] = useState<string>(() => { // Renamed to avoid conflict with context value
     const storedColor = localStorage.getItem('primaryColor');
     return storedColor || initialPrimaryColor;
  });
  
  const [selectedThemeOption, setSelectedThemeOptionState] = useState<ThemeOption>(() => {
    const storedThemeOptionName = localStorage.getItem('selectedThemeOptionName');
    const foundTheme = DEFAULT_THEME_OPTIONS.find(opt => opt.name === storedThemeOptionName);
    return foundTheme || DEFAULT_THEME_OPTIONS[0];
  });


  const updateCSSVariables = useCallback((color: string) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary-default', color);
    // Derive light/dark shades or use a simple mechanism
    // Example: (this is a very basic way to generate shades, consider a library for better results)
    const lighten = (hex: string, percent: number) => {
        hex = hex.replace(/^#/, '');
        const num = parseInt(hex, 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    };
    const darken = (hex: string, percent: number) => {
        hex = hex.replace(/^#/, '');
        const num = parseInt(hex, 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) - amt,
            G = (num >> 8 & 0x00FF) - amt,
            B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    };
    
    root.style.setProperty('--color-primary-light', lighten(color, 20)); 
    root.style.setProperty('--color-primary-dark', darken(color, 10)); 
  }, []);

  useEffect(() => {
    localStorage.setItem('themeName', themeName);
    // The 'dark' class on documentElement is now handled by App.tsx
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    updateCSSVariables(primaryColor);
  }, [primaryColor, updateCSSVariables]);
  
  useEffect(() => {
    localStorage.setItem('selectedThemeOptionName', selectedThemeOption.name);
    setPrimaryColorState(selectedThemeOption.primaryColor); 
  }, [selectedThemeOption]);


  const setSelectedThemeOption = (theme: ThemeOption) => {
    setSelectedThemeOptionState(theme);
  };

  return (
    <ThemeContext.Provider value={{ 
        themeName, 
        primaryColor: selectedThemeOption.primaryColor, 
        themeOptions: DEFAULT_THEME_OPTIONS, 
        setThemeName, 
        setPrimaryColor: (color: string) => { 
            const existingOption = DEFAULT_THEME_OPTIONS.find(opt => opt.primaryColor === color);
            if (existingOption) {
                 setSelectedThemeOption(existingOption);
            } else {
                // If allowing fully custom colors not in options:
                // const newOption = { name: "Custom", label: `Custom (${color})`, primaryColor: color };
                // setSelectedThemeOption(newOption);
                // Or find the closest, or just set primaryColorState directly if not tied to themeOptions
                setPrimaryColorState(color); // Directly set if not matching an option.
            }
        },
        setSelectedThemeOption
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};