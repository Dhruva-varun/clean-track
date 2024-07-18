import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminRegister from './pages/admin/AdminRegister';
import AdminLogin from './pages/admin/AdminLogin';
import DriverRegister from './pages/driver/DriverRegister';
import DriverLogin from './pages/driver/DriverLogin';
import UserRegister from './pages/user/UserRegister';
import UserLogin from './pages/user/UserLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Navbar from './components/Navbar';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/driver/register" element={<DriverRegister />} />
      <Route path="/driver/login" element={<DriverLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;
