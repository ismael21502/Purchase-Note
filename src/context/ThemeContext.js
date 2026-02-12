import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme()
    
    const [theme, setTheme] = useState(colorScheme ?? 'light')
    useEffect(() => {
        setTheme(colorScheme ?? 'light')
    }, [colorScheme])
    const primary = '#2592d1'
    const themes = {
        light: {
            primary: primary,
            background: '#f2f2f7',
            card: '#fff',
            text: '#333',
            subText: '#666',
            border: '#ddd',
            inputBackground: '#f9f9f9',
            error: '#ff3b30',
        },
        dark: {
            primary: primary,
            background: '#141927',
            card: '#1c243a',
            text: '#f0f0f0',
            subText: '#d4d4d4',
            border: '#1e3058',
            inputBackground: '#1c243a',
            error: '#ff3b30',
        }
    }
    const colors = themes[theme];

    return (
        <ThemeContext.Provider value={{ colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
