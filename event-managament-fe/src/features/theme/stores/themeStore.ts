import { create } from 'zustand';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

const THEME_COOKIE_KEY = 'hype-theme-preference';
const COOKIE_EXPIRY_DAYS = 365;

// Helper to get system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper to resolve theme
const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

// Helper to apply theme to DOM
const applyThemeToDOM = (resolvedTheme: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'light',

  setTheme: (theme: Theme) => {
    const resolvedTheme = resolveTheme(theme);
    
    // Save to cookie
    Cookies.set(THEME_COOKIE_KEY, theme, { expires: COOKIE_EXPIRY_DAYS });
    
    // Apply to DOM
    applyThemeToDOM(resolvedTheme);
    
    set({ theme, resolvedTheme });
  },

  toggleTheme: () => {
    const { theme, resolvedTheme } = get();
    
    // If system theme, switch to opposite of resolved
    // If light, switch to dark
    // If dark, switch to light
    let newTheme: Theme;
    if (theme === 'system') {
      newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    } else {
      newTheme = theme === 'dark' ? 'light' : 'dark';
    }
    
    get().setTheme(newTheme);
  },

  initializeTheme: () => {
    // Read from cookie
    const savedTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
    const theme = savedTheme || 'system';
    const resolvedTheme = resolveTheme(theme);
    
    // Apply to DOM
    applyThemeToDOM(resolvedTheme);
    
    set({ theme, resolvedTheme });
    
    // Listen for system theme changes
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const currentTheme = get().theme;
        if (currentTheme === 'system') {
          const newResolved = e.matches ? 'dark' : 'light';
          applyThemeToDOM(newResolved);
          set({ resolvedTheme: newResolved });
        }
      });
    }
  },
}));
