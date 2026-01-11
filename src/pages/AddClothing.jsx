import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClothes, saveClothes } from '../utils/storage';

// AddClothing captures new closet pieces with validation so outfits have solid data.
const AddClothing = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', category: '', color: '', season: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.category) nextErrors.category = 'Category is required';
    if (!form.color) nextErrors.color = 'Color is required';
    if (!form.season) nextErrors.season = 'Season is required';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    const clothes = getClothes();
    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: form.name,
      category: form.category,
      color: form.color,
      season: form.season,
    };
    const next = [...clothes, newItem];
    saveClothes(next);
    navigate('/closet');
  };

  return (
    <div className="card">
      <h2>Add clothing</h2>
      <p>Track every piece so suggestions and outfits stay accurate.</p>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name (optional)</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="E.g. Cream blouse" />
        </div>
        <div>
          <label htmlFor="category">Category *</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="tops">Top</option>
            <option value="bottoms">Bottom</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
          {errors.category && <div className="error">{errors.category}</div>}
        </div>
        <div>
          <label htmlFor="color">Color *</label>
          <input id="color" name="color" value={form.color} onChange={handleChange} placeholder="E.g. Blush pink" />
          {errors.color && <div className="error">{errors.color}</div>}
        </div>
        <div>
          <label htmlFor="season">Season *</label>
          <select id="season" name="season" value={form.season} onChange={handleChange}>
            <option value="">Select season</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
          </select>
          {errors.season && <div className="error">{errors.season}</div>}
        </div>
        <div className="actions">
          <button className="button" type="submit">
            Save item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClothing;
