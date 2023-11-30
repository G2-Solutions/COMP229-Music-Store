import React, { useState, useEffect } from 'react';
import { list } from './api-user.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../auth/auth-helper.js';

const Profile = () => {
  const [users, setProfile] = useState([]);
  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  if (!jwt) {
    navigate('/login', { state: { from: location } });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setProfile(data || []);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div style={{ padding: '16px', margin: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Profile</h2>
      <ul style={{ padding: '0', listStyleType: 'none', margin: '0' }}>
        {users.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '40px',
              padding: '60px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '16px',
                borderRadius: '50%',
                overflow: 'hidden',
                width: '80px',
                height: '80px',
                marginBottom: '16px',
                position: 'relative',
              }}
            >
              <img
                src="default-profile.png"
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ textAlign: 'left', flex: '1' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</p>
              <p style={{ fontSize: '1rem', color: '#777' }}>{item.email}</p>

              {/* Edit Profile button */}
              <button
                style={{
                  marginTop: '20px',
                  padding: '8px',
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;