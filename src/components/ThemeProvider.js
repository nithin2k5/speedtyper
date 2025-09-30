"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const themes = {
  dark: {
    name: 'Dark',
    background: 'bg-black',
    gradient: 'from-indigo-950 via-blue-950 to-purple-950',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    textMuted: 'text-gray-500',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-gray-700/50',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-gray-600/50',
    buttonBg: 'bg-gray-700',
    buttonHover: 'hover:bg-gray-600',
    accentBg: 'bg-indigo-500/20',
    accentBorder: 'border-indigo-400/30',
    accentText: 'text-indigo-400',
    glow: 'shadow-indigo-500/20',
  },
  cyber: {
    name: 'Cyber',
    background: 'bg-black',
    gradient: 'from-green-950 via-emerald-950 to-teal-950',
    text: 'text-green-400',
    textSecondary: 'text-green-300',
    textMuted: 'text-green-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-green-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-green-500/40',
    buttonBg: 'bg-green-900',
    buttonHover: 'hover:bg-green-800',
    accentBg: 'bg-green-500/20',
    accentBorder: 'border-green-400/30',
    accentText: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
  purple: {
    name: 'Purple',
    background: 'bg-black',
    gradient: 'from-purple-950 via-violet-950 to-fuchsia-950',
    text: 'text-purple-300',
    textSecondary: 'text-purple-200',
    textMuted: 'text-purple-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-purple-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-purple-500/40',
    buttonBg: 'bg-purple-900',
    buttonHover: 'hover:bg-purple-800',
    accentBg: 'bg-purple-500/20',
    accentBorder: 'border-purple-400/30',
    accentText: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
  ocean: {
    name: 'Ocean',
    background: 'bg-black',
    gradient: 'from-cyan-950 via-blue-950 to-indigo-950',
    text: 'text-cyan-300',
    textSecondary: 'text-cyan-200',
    textMuted: 'text-cyan-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-cyan-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-cyan-500/40',
    buttonBg: 'bg-cyan-900',
    buttonHover: 'hover:bg-cyan-800',
    accentBg: 'bg-cyan-500/20',
    accentBorder: 'border-cyan-400/30',
    accentText: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  sunset: {
    name: 'Sunset',
    background: 'bg-black',
    gradient: 'from-orange-950 via-red-950 to-pink-950',
    text: 'text-orange-300',
    textSecondary: 'text-orange-200',
    textMuted: 'text-orange-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-orange-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-orange-500/40',
    buttonBg: 'bg-orange-900',
    buttonHover: 'hover:bg-orange-800',
    accentBg: 'bg-orange-500/20',
    accentBorder: 'border-orange-400/30',
    accentText: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  neon: {
    name: 'Neon',
    background: 'bg-black',
    gradient: 'from-pink-950 via-purple-950 to-blue-950',
    text: 'text-pink-300',
    textSecondary: 'text-pink-200',
    textMuted: 'text-pink-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-pink-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-pink-500/40',
    buttonBg: 'bg-pink-900',
    buttonHover: 'hover:bg-pink-800',
    accentBg: 'bg-pink-500/20',
    accentBorder: 'border-pink-400/30',
    accentText: 'text-pink-400',
    glow: 'shadow-pink-500/20',
  },
  forest: {
    name: 'Forest',
    background: 'bg-black',
    gradient: 'from-emerald-950 via-green-950 to-lime-950',
    text: 'text-emerald-300',
    textSecondary: 'text-emerald-200',
    textMuted: 'text-emerald-600',
    cardBg: 'bg-gray-900/90',
    cardBorder: 'border-emerald-500/30',
    inputBg: 'bg-gray-800/80',
    inputBorder: 'border-emerald-500/40',
    buttonBg: 'bg-emerald-900',
    buttonHover: 'hover:bg-emerald-800',
    accentBg: 'bg-emerald-500/20',
    accentBorder: 'border-emerald-400/30',
    accentText: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('speedtype-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('speedtype-theme', themeName);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes: Object.keys(themes) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
