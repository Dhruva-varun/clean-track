import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('driverToken');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/driver/requests', {
        headers: {
          'x-auth-token': token
        }
      });
      setRequests(res.data);
    };
    fetchData();
  }, [token]);

  const handleComplete = async requestId => {
    try {
      await axios.post('/driver/complete-request', { requestId }, {
        headers: {
          'x-auth-token': token
        }
      });
      alert('Request marked as completed');
      window.location.reload();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Driver Dashboard</h2>
      <div className="section">
        <h3>Assigned Pickup Requests</h3>
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              {request.location}
              <button onClick={() => handleComplete(request._id)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriverDashboard;
