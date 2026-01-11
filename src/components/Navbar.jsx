import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/closet', label: 'Closet' },
  { to: '/add', label: 'Add' },
  { to: '/create', label: 'Create' },
  { to: '/suggestions', label: 'Ideas' },
  { to: '/outfits', label: 'Outfits' },
  { to: '/settings', label: 'Settings' },
];

const Navbar = () => {
  const navLinks = links;
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const renderLinks = () =>
    navLinks.map((link) => (
      <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
        {link.label}
      </NavLink>
    ));

  return (
    <>
      <nav className="navbar desktop card">
        <div className="section-header">
          <div className="nav-links">{renderLinks()}</div>
          <div className="nav-utility">
            {currentUser ? (
              <>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Profile
                </NavLink>
                <button type="button" className="button secondary nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <nav className="navbar mobile card">
        <div className="nav-links">{renderLinks()}</div>
        <div className="nav-utility">
          {currentUser ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                Profile
              </NavLink>
              <button type="button" className="button secondary nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
