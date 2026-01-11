import React from 'react';
import { getCategoryIcon } from "../utils/icons.jsx";


// ClothingCard centralizes the closet look so deletions and details stay consistent.
const ClothingCard = ({ item, onDelete }) => {
  return (
    <div className="card clothing-card">
      <div className="card-header">
        <div className="chip-row" style={{ alignItems: 'center' }}>
          <div className="icon-circle">{getCategoryIcon(item.category)}</div>
          <div>
            <h4>{item.name?.trim() || 'Unnamed piece'}</h4>
            <small>{item.category}</small>
          </div>
        </div>
        <button className="button secondary" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
      <div className="meta-row">
        <span className="badge">Color: {item.color}</span>
        <span className="badge">Season: {item.season}</span>
      </div>
    </div>
  );
};

export default ClothingCard;
