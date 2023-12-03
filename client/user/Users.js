import React, { useState, useEffect } from 'react';
import { list } from './api-user.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../auth/auth-helper.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  if (!jwt) {
    navigate('/signin', { state: { from: location } });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data || []);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div style={{ padding: '16px', margin: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>All Users</h2>
      <ul style={{ padding: '0', listStyleType: 'none', margin: '0' }}>
        {users.map((item, i) => (
          <Link to={`/user/${item._id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)')}
            >
              <div style={{ marginRight: '16px', borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                <img src="default-profile.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: '1' }}>{item.name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Users;
