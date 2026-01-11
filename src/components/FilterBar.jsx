import React from 'react';

const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories'];
const seasons = ['all', 'winter', 'spring', 'summer', 'autumn'];

// FilterBar keeps closet filtering consistent so clothes stay discoverable.
const FilterBar = ({ filters, onChange }) => {
  const handleSelect = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="section-header">
        <h3>Filter items</h3>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        <div>
          <label>Category</label>
          <select value={filters.category} onChange={(e) => handleSelect('category', e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Season</label>
          <select value={filters.season} onChange={(e) => handleSelect('season', e.target.value)}>
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All seasons' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
