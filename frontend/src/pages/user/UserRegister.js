import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import '../admin/AdminAuth.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/register', formData);
      alert(res.data);
      navigate('/user/login');
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
