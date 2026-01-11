import React from 'react';
import ThemeToggle from '../components/ThemeToggle';

// Settings focuses on theme switching so the preference persists across visits.
const Settings = ({ theme, setTheme }) => {
  return (
    <div className="card">
      <h2>Settings</h2>
      <p>Switch between light and dark moods to fit your viewing comfort.</p>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Settings;
