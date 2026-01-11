import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClothes } from '../utils/storage';
import { getCategoryIcon } from '../utils/icons';

// Suggestions builds a random seasonal look while explaining gaps in the closet.
const Suggestions = () => {
  const [clothes, setClothes] = useState([]);
  const [season, setSeason] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    setClothes(getClothes());
  }, []);

  const handleSeason = (value) => {
    setSeason(value);
    if (!value) {
      setSuggestion(null);
      setMissing([]);
      return;
    }
    const seasonal = clothes.filter((c) => c.season === value);
    const pick = (cat) => seasonal.filter((c) => c.category === cat);
    const tops = pick('tops');
    const bottoms = pick('bottoms');
    const shoes = pick('shoes');

    const missingCats = [];
    if (!tops.length) missingCats.push('tops');
    if (!bottoms.length) missingCats.push('bottoms');
    if (!shoes.length) missingCats.push('shoes');

    setMissing(missingCats);

    if (missingCats.length) {
      setSuggestion(null);
      return;
    }

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setSuggestion({
      top: random(tops),
      bottom: random(bottoms),
      shoe: random(shoes),
    });
  };

  return (
    <div className="card">
      <h2>Seasonal suggestions</h2>
      <p>Pick a season and we will pair a cozy trio for you.</p>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="season">Season</label>
        <select id="season" value={season} onChange={(e) => handleSeason(e.target.value)}>
          <option value="">Choose a season</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </div>

      {!clothes.length && (
        <div className="alert">
          Add clothing first so we can suggest combinations.
          <div className="link-row" style={{ marginTop: '0.5rem' }}>
            <Link to="/add" className="button secondary">
              Add clothing
            </Link>
          </div>
        </div>
      )}

      {season && missing.length > 0 && (
        <div className="alert">
          Missing for {season}: {missing.join(', ')}. Add these categories to unlock suggestions.
        </div>
      )}

      {season && suggestion && (
        <div className="grid" style={{ marginTop: '1rem' }}>
          {['top', 'bottom', 'shoe'].map((key) => {
            const item = suggestion[key];
            const category = key === 'top' ? 'tops' : key === 'bottom' ? 'bottoms' : 'shoes';
            return (
              <div key={key} className="card" style={{ padding: '0.9rem' }}>
                <div className="chip-row" style={{ alignItems: 'center' }}>
                  <div className="icon-circle">{getCategoryIcon(category)}</div>
                  <div>
                    <strong>{item.name || 'Unnamed piece'}</strong>
                    <div style={{ color: 'var(--muted)' }}>{item.color}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
