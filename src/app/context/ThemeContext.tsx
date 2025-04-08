'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';

// Define theme types
type Theme = 'light' | 'dark' | 'system';

// Context interface
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Create theme context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  toggleTheme: () => {},
  isDarkMode: false
});

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme on client-side
  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    // Set initial theme
    setTheme(savedTheme || 'system');
    setIsDarkMode(
      savedTheme === 'dark' || 
      (savedTheme !== 'light' && systemPreference === 'dark')
    );
    setIsMounted(true);
  }, []);

  // Apply theme effect
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    
    // Remove existing classes
    root.classList.remove('light', 'dark');

    // Determine effective theme (what's actually shown to the user)
    const effectiveTheme = getEffectiveTheme();
    
    // Apply theme class
    root.classList.add(effectiveTheme);
    
    // Update dark mode state
    setIsDarkMode(effectiveTheme === 'dark');

    // Persist theme (except for system)
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }
    
    // Update meta theme-color
    updateMetaThemeColor(effectiveTheme);
  }, [theme, isMounted]);

  // Add media query listener for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        // Force a re-render by toggling and then re-applying system
        setTheme('light');
        setTimeout(() => setTheme('system'), 0);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  // Helper to get the effective theme (what's shown to user)
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  // Update meta theme-color for browser UI
  const updateMetaThemeColor = (mode: 'light' | 'dark') => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = mode === 'dark' ? '#0F172A' : '#ffffff';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  };

  // Theme toggle logic
  const toggleTheme = () => {
    setTheme(current => 
      current === 'light' ? 'dark' 
      : current === 'dark' ? 'system'
      : 'light'
    );
  };

  // Prevent rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}