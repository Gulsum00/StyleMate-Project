import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Closet from './pages/Closet';
import AddClothing from './pages/AddClothing';
import CreateOutfit from './pages/CreateOutfit';
import Suggestions from './pages/Suggestions';
import Outfits from './pages/Outfits';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { getTheme, saveTheme, getClothes, getOutfits } from './utils/storage';

// App coordinates routing and theme so every page stays in sync.
const App = () => {
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    getClothes();
    getOutfits();
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/add" element={<AddClothing />} />
          <Route path="/create" element={<CreateOutfit />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
