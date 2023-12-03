import React, { useState, useEffect } from 'react';
import { list } from './api-user.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../auth/auth-helper.js';
import { update } from './api-user.js';

const Profile = () => {
  const [users, setProfile] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  if (!jwt) {
    navigate('/login', { state: { from: location } });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

<<<<<<< HEAD
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setProfile(data || []);
      }
    });
=======
    if (!jwt) {
      navigate('/signin', { state: { from: location } });
    } else {
      read({ userId: jwt.user._id }, { t: jwt.token }, signal).then((data) => {
        if (!abortController.signal.aborted) {
          if (!data && data.error) {
            navigate('/signin', { state: { from: location } });
          } else {
            setUser(data);
          }
        }
      });
    }
>>>>>>> 4b696a7ccd9cbe09c454a8333908645fc1817722

    return function cleanup() {
      abortController.abort();
    };
  }, []);

<<<<<<< HEAD
  const updateProfile = (userId, user) => {
    console.log('Updating profile for user ID:', userId);
    console.log('Updating user data:', user);
  
    const jwt = auth.isAuthenticated();
    update({ userId }, { t: jwt.token }, user)
      .then((data) => {
        console.log('Update response:', data);
        if (data && data.error) {
          console.log(data.error);
        } else {
          console.log('Profile updated successfully:', data);
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };
  
  
  const handleSaveChanges = () => {
    const userId = users.length > 0 ? users[0]._id : '';
    console.log('User ID:', userId);
    const updatedUser = {
      name: newName || users[0].name,
      email: newEmail || users[0].email,
      password: newPassword,
    };
    console.log('Update Profile Function Call:', updatedUser);
  
    updateProfile(userId, updatedUser);
    setEditModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
  };
  
=======
  if (!jwt) {
    return <Navigate to="/signin" />;
  }
>>>>>>> 4b696a7ccd9cbe09c454a8333908645fc1817722

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

              <button
                onClick={() => setEditModalOpen(true)}
                style={{
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>

              {editModalOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', width: '300px' }}>
                    <h2>Edit Profile</h2>
                    <label>New Name:</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <label>New Email:</label>
                    <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <label>Confirm Password:</label>
                    <input type="password" />
                    <button onClick={() => { console.log('Save Changes button clicked'); handleSaveChanges(); }}>
                      Save Changes</button>
                    <button onClick={() => setEditModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
