import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

const colors = {
    primary: '#00a2ff',
    secondary: '#34C759',
    background: '#f2f2f7',
    card: '#fff',
    text: '#333',
    subText: '#666',
    border: '#ddd',
    inputBackground: '#f9f9f9',
    error: '#ff3b30',
};

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
