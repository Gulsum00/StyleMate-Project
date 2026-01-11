import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Login page validates credentials against localStorage.
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
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

    const result = login({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    const redirectTo = location.state?.from?.pathname || '/profile';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <p>Sign in to access your saved looks and profile.</p>
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
        {error && <div className="error">{error}</div>}
        <div className="actions">
          <button className="button" type="submit">
            Login
          </button>
        </div>
        <small>
          Don&apos;t have an account? <Link to="/register">Create one</Link>.
        </small>
      </form>
    </div>
  );
};

export default Login;
