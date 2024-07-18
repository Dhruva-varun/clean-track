import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const driversRes = await axios.get('/admin/drivers');
      setDrivers(driversRes.data);
      const requestsRes = await axios.get('/admin/requests');
      setRequests(requestsRes.data);
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      await axios.post('/admin/assign-driver', {
        requestId: selectedRequest,
        driverId: selectedDriver
      });
      alert('Driver assigned successfully');
      window.location.reload();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="section">
        <h3>All Drivers</h3>
        <ul>
          {drivers.map(driver => (
            <li key={driver._id}>{driver.name} ({driver.email})</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>All Pickup Requests</h3>
        <ul>
          {requests.map(request => (
            <li key={request._id}>{request.location}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>Assign Driver to Pickup Request</h3>
        <select onChange={e => setSelectedRequest(e.target.value)}>
          <option value="">Select Request</option>
          {requests.map(request => (
            <option key={request._id} value={request._id}>{request.location}</option>
          ))}
        </select>
        <select onChange={e => setSelectedDriver(e.target.value)}>
          <option value="">Select Driver</option>
          {drivers.map(driver => (
            <option key={driver._id} value={driver._id}>{driver.name}</option>
          ))}
        </select>
        <button onClick={handleAssign}>Assign</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
