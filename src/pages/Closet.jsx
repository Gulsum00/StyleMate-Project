import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClothingCard from '../components/ClothingCard';
import FilterBar from '../components/FilterBar';
import { getClothes, saveClothes } from '../utils/storage';

// Closet lists all clothing and handles filter/delete actions against storage.
const Closet = () => {
  const [clothes, setClothes] = useState([]);
  const [filters, setFilters] = useState({ category: 'all', season: 'all' });

  useEffect(() => {
    setClothes(getClothes());
  }, []);

  const filtered = useMemo(
    () =>
      clothes.filter((item) => {
        const matchCategory = filters.category === 'all' || item.category === filters.category;
        const matchSeason = filters.season === 'all' || item.season === filters.season;
        return matchCategory && matchSeason;
      }),
    [clothes, filters]
  );

  const handleDelete = (id) => {
    const updated = clothes.filter((c) => c.id !== id);
    setClothes(updated);
    saveClothes(updated);
  };

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />

      {!clothes.length ? (
        <div className="card empty-state">
          <h3>Your closet is empty</h3>
          <p>Add tops, bottoms, and shoes to start planning outfits.</p>
          <div className="link-row" style={{ justifyContent: 'center' }}>
            <Link className="button" to="/add">
              Add clothing
            </Link>
            <Link className="button secondary" to="/create">
              Create outfit
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((item) => (
            <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
          {!filtered.length && (
            <div className="card empty-state" style={{ gridColumn: '1/-1' }}>
              <h4>No items match these filters</h4>
              <p>Try switching to another category or season.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Closet;
