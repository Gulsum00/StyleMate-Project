import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OutfitCard from '../components/OutfitCard';
import { getOutfits, saveOutfits, getClothes, findClothingById } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

// Outfits lists saved looks and keeps favorite/delete state synced to storage.
const Outfits = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setOutfits(getOutfits());
    setClothes(getClothes());
  }, []);

  const handleToggle = (id) => {
    if (!currentUser) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const next = outfits.map((o) => (o.id === id ? { ...o, isFav: !o.isFav } : o));
    setOutfits(next);
    saveOutfits(next);
  };

  const handleDelete = (id) => {
    const next = outfits.filter((o) => o.id !== id);
    setOutfits(next);
    saveOutfits(next);
  };

  const filteredOutfits = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return outfits;

    const terms = normalized.split(/\s+/).filter(Boolean);

    return outfits.filter((outfit) => {
      const items = [outfit.topId, outfit.bottomId, outfit.shoeId]
        .map((id) => findClothingById(clothes, id))
        .filter(Boolean);

      const searchable = [outfit.name, outfit.season, ...items.flatMap((item) => [item.name, item.color, item.category])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return terms.every((term) => searchable.includes(term));
    });
  }, [outfits, clothes, query]);

  return (
    <div>
      {!outfits.length ? (
        <div className="card empty-state">
          <h3>No outfits saved yet</h3>
          <p>Combine tops, bottoms, and shoes to start your StyleMate collection.</p>
          <div className="link-row" style={{ justifyContent: 'center' }}>
            <Link className="button" to="/create">
              Create outfit
            </Link>
            <Link className="button secondary" to="/add">
              Add clothing
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-header">
              <h3>Filter outfits</h3>
            </div>
            <div className="form">
              <div>
                <label htmlFor="outfit-search">Search by item name or color</label>
                <input
                  id="outfit-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g. black sweater"
                />
              </div>
            </div>
          </div>
          <div className="grid">
            {filteredOutfits.map((o) => (
              <OutfitCard
                key={o.id}
                outfit={o}
                clothes={clothes}
                onToggleFav={handleToggle}
                onDelete={handleDelete}
                canFavorite={Boolean(currentUser)}
              />
            ))}
            {!filteredOutfits.length && (
              <div className="card empty-state" style={{ gridColumn: '1/-1' }}>
                <h4>No outfits match this search</h4>
                <p>Try another color, item name, or clear the filter.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Outfits;
