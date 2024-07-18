import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import '../admin/AdminAuth.css';

const DriverLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/driver/login', formData);
      localStorage.setItem('driverToken', res.data.token);
      navigate('/driver/dashboard');
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <h2>Driver Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DriverLogin;
