import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getClothes, getOutfits, saveOutfits } from '../utils/storage';

// CreateOutfit composes tops/bottoms/shoes into a saved look with validation.
const CreateOutfit = () => {
  const navigate = useNavigate();
  const [clothes, setClothes] = useState([]);
  const [form, setForm] = useState({ name: '', season: '', topId: '', bottomId: '', shoeId: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setClothes(getClothes());
  }, []);

  const tops = useMemo(() => clothes.filter((c) => c.category === 'tops'), [clothes]);
  const bottoms = useMemo(() => clothes.filter((c) => c.category === 'bottoms'), [clothes]);
  const shoes = useMemo(() => clothes.filter((c) => c.category === 'shoes'), [clothes]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.topId) next.topId = 'Pick a top';
    if (!form.bottomId) next.bottomId = 'Pick a bottom';
    if (!form.shoeId) next.shoeId = 'Pick shoes';
    if (!form.season) next.season = 'Season is required';
    return next;
  };

  const missingCategories = ['tops', 'bottoms', 'shoes'].filter((cat) => !clothes.some((c) => c.category === cat));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const outfits = getOutfits();
    const newOutfit = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: form.name,
      season: form.season,
      topId: form.topId,
      bottomId: form.bottomId,
      shoeId: form.shoeId,
      createdAt: new Date().toISOString(),
      isFav: false,
    };
    saveOutfits([...outfits, newOutfit]);
    navigate('/outfits');
  };

  const noOptions = missingCategories.length > 0;

  return (
    <div className="card">
      <h2>Create outfit</h2>
      <p>Pair pieces together and track which looks you love.</p>

      {noOptions && (
        <div className="alert" style={{ marginBottom: '1rem' }}>
          Missing categories: {missingCategories.join(', ')}. Add the required pieces before creating an outfit.
          <div className="link-row" style={{ marginTop: '0.5rem' }}>
            <Link to="/add" className="button secondary">
              Add clothing
            </Link>
          </div>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name (optional)</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Brunch Sunday" />
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
        <div>
          <label htmlFor="topId">Top *</label>
          <select id="topId" name="topId" value={form.topId} onChange={handleChange} disabled={!tops.length}>
            <option value="">Select top</option>
            {tops.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || 'Unnamed piece'} ({item.color})
              </option>
            ))}
          </select>
          {errors.topId && <div className="error">{errors.topId}</div>}
        </div>
        <div>
          <label htmlFor="bottomId">Bottom *</label>
          <select id="bottomId" name="bottomId" value={form.bottomId} onChange={handleChange} disabled={!bottoms.length}>
            <option value="">Select bottom</option>
            {bottoms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || 'Unnamed piece'} ({item.color})
              </option>
            ))}
          </select>
          {errors.bottomId && <div className="error">{errors.bottomId}</div>}
        </div>
        <div>
          <label htmlFor="shoeId">Shoes *</label>
          <select id="shoeId" name="shoeId" value={form.shoeId} onChange={handleChange} disabled={!shoes.length}>
            <option value="">Select shoes</option>
            {shoes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || 'Unnamed piece'} ({item.color})
              </option>
            ))}
          </select>
          {errors.shoeId && <div className="error">{errors.shoeId}</div>}
        </div>
        <div className="actions">
          <button className="button" type="submit" disabled={noOptions}>
            Save outfit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOutfit;
