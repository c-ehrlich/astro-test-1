// https://github.com/withastro/docs/blob/main/src/components/Header/ThemeToggleButton.tsx
// https://github.com/withastro/docs/blob/main/src/components/Header/ThemeToggleButton.css

import type { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
// import './ThemeToggleButton.css';

const ThemeToggleButton: FunctionalComponent = () => {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    return document.documentElement.classList.contains('theme-dark')
      ? 'dark'
      : 'light';
  });

  console.log('theme:', theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
    }
  }, [theme]);

  return (
    <div class='theme-toggle'>
      <button
        onClick={() =>
          setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
        }
      >
        theme: {theme}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
