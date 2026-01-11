import React from 'react';

// ThemeToggle keeps the light/dark preference consistent across pages.
const ThemeToggle = ({ theme, setTheme }) => {
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button className="button" onClick={toggle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;
