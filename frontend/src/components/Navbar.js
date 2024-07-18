import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // assuming you have some styles

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Clean-Track</Link>
    <div className="navbar-links">
      <Link to="/admin/register">Admin</Link>
      <Link to="/driver/register">Driver</Link>
      <Link to="/user/register">User</Link>
    </div>
  </nav>
);

export default Navbar;
