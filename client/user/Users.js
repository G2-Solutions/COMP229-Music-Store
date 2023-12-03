import React, { useState, useEffect } from 'react';
import { list } from './api-user.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../auth/auth-helper.js';
import '../styles/users.css';

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
    <div className="container">
      <h2>All Users</h2>
      <ul className="userList">
        {users.map((item, i) => (
          <Link to={`/user/${item._id}`} key={i} className="user-link">
            <li className="userListItem">
              <div>
                <div>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Users;
