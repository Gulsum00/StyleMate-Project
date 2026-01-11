import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Register page saves a new user into localStorage.
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    const result = register({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate('/profile', { replace: true });
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <p>Create an account to save your outfits and preferences.</p>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm password *</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="actions">
          <button className="button" type="submit">
            Register
          </button>
          <Link className="button secondary" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
