import React from 'react';
import { getCategoryIcon } from '../utils/icons';
import { findClothingById } from '../utils/storage';

// OutfitCard shows composed looks and keeps favorite/delete actions together.
const OutfitCard = ({ outfit, clothes, onToggleFav, onDelete, canFavorite = true }) => {
  const renderItem = (id, label, category) => {
    const item = findClothingById(clothes, id);
    return (
      <div className="card" style={{ padding: '0.75rem' }}>
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
    <div className="card outfit-card">
      <div className="card-header">
        <div>
          <h3>{outfit.name?.trim() || 'Untitled outfit'}</h3>
          <small>
            Season: {outfit.season} - Created {new Date(outfit.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div className="actions">
          <button className="button secondary" onClick={() => onToggleFav(outfit.id)}>
            {canFavorite ? (outfit.isFav ? 'Unfavorite' : 'Favorite') : 'Login to manage favorites'}
          </button>
          <button className="button secondary" onClick={() => onDelete(outfit.id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="meta-row">
        <span className="badge">{outfit.isFav ? 'Loved' : 'Saved'}</span>
        <span className="badge">{outfit.season}</span>
      </div>
      <div className="outfit-items">
        {renderItem(outfit.topId, 'Top', 'tops')}
        {renderItem(outfit.bottomId, 'Bottom', 'bottoms')}
        {renderItem(outfit.shoeId, 'Shoes', 'shoes')}
      </div>
    </div>
  );
};

export default OutfitCard;
