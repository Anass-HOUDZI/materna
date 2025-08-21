
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemPrefersDark(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemPrefersDark(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (newTheme: Theme) => {
      root.classList.remove('light', 'dark');
      
      if (newTheme === 'system') {
        const systemTheme = systemPrefersDark ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, systemPrefersDark]);

  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
  const isLight = theme === 'light' || (theme === 'system' && !systemPrefersDark);

  return {
    theme,
    setTheme,
    isDark,
    isLight,
  };
}
