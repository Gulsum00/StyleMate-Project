import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OutfitCard from '../components/OutfitCard';
import { getOutfits, saveOutfits, getClothes } from '../utils/storage';

// Outfits lists saved looks and keeps favorite/delete state synced to storage.
const Outfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    setOutfits(getOutfits());
    setClothes(getClothes());
  }, []);

  const handleToggle = (id) => {
    const next = outfits.map((o) => (o.id === id ? { ...o, isFav: !o.isFav } : o));
    setOutfits(next);
    saveOutfits(next);
  };

  const handleDelete = (id) => {
    const next = outfits.filter((o) => o.id !== id);
    setOutfits(next);
    saveOutfits(next);
  };

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
        <div className="grid">
          {outfits.map((o) => (
            <OutfitCard key={o.id} outfit={o} clothes={clothes} onToggleFav={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Outfits;
