import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/closet', label: 'Closet' },
  { to: '/add', label: 'Add' },
  { to: '/create', label: 'Create' },
  { to: '/suggestions', label: 'Ideas' },
  { to: '/outfits', label: 'Outfits' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];

const Navbar = () => {
  const renderLinks = () =>
    links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {link.label}
      </NavLink>
    ));

  return (
    <>
      <nav className="navbar desktop card">
        <div className="section-header">
          <div className="brand">StyleMate</div>
          <div className="nav-links">{renderLinks()}</div>
        </div>
      </nav>

      <nav className="navbar mobile card">
        <div className="brand">StyleMate</div>
        <div className="nav-links">{renderLinks()}</div>
      </nav>
    </>
  );
};

export default Navbar;
