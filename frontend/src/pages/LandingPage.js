import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // assuming you have some styles

const LandingPage = () => (
  <div className="landing-page">
    <h1>Welcome to Clean-Track</h1>
    <p>Choose your role to proceed:</p>
    <div className="role-select">
      <Link to="/admin/login" className="role-button">Admin</Link>
      <Link to="/driver/login" className="role-button">Driver</Link>
      <Link to="/user/login" className="role-button">User</Link>
      <h1 className="title">Clean-Track</h1>
    </div>
  </div>
);

export default LandingPage;
