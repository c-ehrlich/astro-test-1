// https://github.com/withastro/docs/blob/main/src/components/Header/ThemeToggleButton.tsx
// https://github.com/withastro/docs/blob/main/src/components/Header/ThemeToggleButton.css

import { useState, useEffect } from 'react';
import './ThemeToggleButton.css';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

function ThemeToggleButton() {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    return document.documentElement.classList.contains('theme-dark')
      ? 'dark'
      : 'light';
  });

  function handleThemeChange() {
    const oppositeTheme = theme === 'light' ? 'dark' : 'light';

    const matchesDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (
      (matchesDarkTheme && oppositeTheme === 'dark') ||
      (!matchesDarkTheme && oppositeTheme === 'light')
    ) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', oppositeTheme);
    }

    setTheme(oppositeTheme);
  }

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
    }
  }, [theme]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.button
        key={theme === 'light' ? 'light-icon' : 'dark-icon'}
        className='ThemeToggleButton'
        onClick={handleThemeChange}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? '🌤️' : '🌙'}
      </motion.button>
    </AnimatePresence>
  );
}

function ThemeToggleButtonContainer() {
  return (
    <AnimateSharedLayout>
      <ThemeToggleButton />
    </AnimateSharedLayout>
  );
}

export default ThemeToggleButtonContainer;
