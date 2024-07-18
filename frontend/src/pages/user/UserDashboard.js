import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import './UserDashboard.css';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ location: '', image: '' });
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/user/requests', {
          headers: { 'x-auth-token': token } 
          // Use the correct header
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch requests');
      }
    };
    fetchData();
  }, [token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    // Ensure formData and token are correctly defined
    const token = localStorage.getItem('userToken');;
  
    try {
      const res = await axios.post('/user/request', formData, {
        headers: { 'x-auth-token': token }
      });
      console.log(res.data); // Correctly log the response data
      alert('Pickup request added successfully');
      setRequests(prevRequests => [...prevRequests, res.data]);
    } catch (err) {
      console.error(err);
      alert('Failed to add request');
    }
  };
  

  const handleDelete = async requestId => {
    try {
      await axios.delete(`/user/request/${requestId}`, {
        headers: { 'x-auth-token': token } // Use the correct header
      });
      setRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
      alert('Request deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete request');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="section">
        <h3>Add Pickup Request</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
          <button type="submit">Add Request</button>
        </form>
      </div>
      <div className="section">
        <h3>Your Pickup Requests</h3>
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              {request.location}
              <button onClick={() => handleDelete(request._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
