import React, { useEffect, useMemo, useState } from 'react';
import { getClothes, getOutfits, findClothingById } from '../utils/storage';
import { getCategoryIcon } from '../utils/icons';

// Profile summarizes closet stats so the user sees progress at a glance.
const Profile = () => {
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    setClothes(getClothes());
    setOutfits(getOutfits());
  }, []);

  const stats = useMemo(
    () => ({
      clothes: clothes.length,
      outfits: outfits.length,
      favorites: outfits.filter((o) => o.isFav).length,
    }),
    [clothes, outfits]
  );

  const latest = useMemo(
    () =>
      [...outfits]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
    [outfits]
  );

  const renderItem = (id, label, category) => {
    const item = findClothingById(clothes, id);
    return (
      <div className="chip-row" style={{ alignItems: 'center' }}>
        <div className="icon-circle">{getCategoryIcon(category)}</div>
        <div>
          <strong>{label}</strong>
          <div style={{ color: 'var(--muted)' }}>{item ? item.name || 'Unnamed piece' : 'Missing item'}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>{stats.clothes}</h3>
          <p>Total clothes</p>
        </div>
        <div className="card stat-card">
          <h3>{stats.outfits}</h3>
          <p>Total outfits</p>
        </div>
        <div className="card stat-card">
          <h3>{stats.favorites}</h3>
          <p>Favorite outfits</p>
        </div>
      </div>

      {latest.length > 0 && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="section-header">
            <h3>Latest outfits</h3>
            <span className="badge">Recent 3</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {latest.map((o) => (
              <div key={o.id} className="card" style={{ padding: '0.9rem' }}>
                <h4>{o.name?.trim() || 'Untitled outfit'}</h4>
                <small>
                  {o.season} - {new Date(o.createdAt).toLocaleDateString()} - {o.isFav ? 'Favorite' : 'Saved'}
                </small>
                <div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.4rem' }}>
                  {renderItem(o.topId, 'Top', 'tops')}
                  {renderItem(o.bottomId, 'Bottom', 'bottoms')}
                  {renderItem(o.shoeId, 'Shoes', 'shoes')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
