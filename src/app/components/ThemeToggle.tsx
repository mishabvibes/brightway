'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent render until mounted
  if (!mounted) return null;

  // Theme icons and labels mapping
  const themeInfo = {
    light: {
      icon: <Sun className="w-5 h-5" />,
      label: "Light Mode"
    },
    dark: {
      icon: <Moon className="w-5 h-5" />,
      label: "Dark Mode"
    },
    system: {
      icon: <Monitor className="w-5 h-5" />,
      label: "System Preference"
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        relative 
        w-10 h-10 
        rounded-lg
        flex items-center justify-center 
        bg-neutral-100
        dark:bg-neutral-800
        hover:bg-neutral-200
        dark:hover:bg-neutral-700
        text-neutral-600
        dark:text-neutral-300
        hover:text-primary
        dark:hover:text-primary
        transition-colors 
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-primary/40
      "
      aria-label={`Toggle theme: Current theme is ${theme}`}
      title={themeInfo[theme].label}
    >
      {themeInfo[theme].icon}
    </button>
  );
}