import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOutfits, getClothes, findClothingById } from '../utils/storage';
import { getCategoryIcon } from '../utils/icons';

// Home introduces the app and surfaces a random saved outfit to inspire the user.
const Home = () => {
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    setClothes(getClothes());
    setOutfits(getOutfits());
  }, []);

  const currentSeason = useMemo(() => {
    const month = new Date().getMonth();
    if ([11, 0, 1].includes(month)) return 'winter';
    if ([2, 3, 4].includes(month)) return 'spring';
    if ([5, 6, 7].includes(month)) return 'summer';
    return 'autumn';
  }, []);

  const seasonalOutfits = useMemo(
    () => outfits.filter((o) => o.season === currentSeason),
    [outfits, currentSeason]
  );

  const randomOutfit = useMemo(() => {
    const pool = seasonalOutfits.length ? seasonalOutfits : outfits;
    if (!pool.length) return null;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
  }, [outfits, seasonalOutfits]);

  const renderItem = (id, label, category) => {
    const item = findClothingById(clothes, id);
    return (
      <div className="card" style={{ padding: '0.85rem' }}>
        <div className="chip-row" style={{ alignItems: 'center' }}>
          <div className="icon-circle">{getCategoryIcon(category)}</div>
          <div>
            <strong>{label}</strong>
            <div style={{ color: 'var(--muted)' }}>{item ? item.name || 'Unnamed piece' : 'Missing item'}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h1>StyleMate</h1>
        <p>
          Plan outfits, track your closet, and let StyleMate suggest looks that match your mood and the season.
        </p>
        <div className="link-row">
          <Link to="/add" className="button">
            Add clothing
          </Link>
          <Link to="/create" className="button secondary">
            Build an outfit
          </Link>
        </div>
      </div>

      {randomOutfit ? (
        <div className="card">
          <div className="section-header">
            <h2>Random pick for {currentSeason}</h2>
            <span className="badge">{randomOutfit.season}</span>
          </div>
          <p>We grabbed a season-friendly outfit from your saved looks for quick inspiration.</p>
          <div className="outfit-items">
            {renderItem(randomOutfit.topId, 'Top', 'tops')}
            {renderItem(randomOutfit.bottomId, 'Bottom', 'bottoms')}
            {renderItem(randomOutfit.shoeId, 'Shoes', 'shoes')}
          </div>
        </div>
      ) : (
        <div className="card empty-state">
          <h3>Your looks will appear here</h3>
          <p>Save your first outfit and we will surprise you with picks every time you open StyleMate.</p>
          <div className="link-row" style={{ justifyContent: 'center' }}>
            <Link className="button" to="/add">
              Add clothing
            </Link>
            <Link className="button secondary" to="/create">
              Create outfit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
