import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { remove } from './api-user';

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({ userId: props.userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log('deleted'));
        setNavigate(true);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <span>
      <button onClick={clickButton} style={{ color: 'red' }}>
        Delete
      </button>

      {open && (
        <div>
          <div>{"Delete Account"}</div>
          <div>
            <p>Confirm to delete your account.</p>
          </div>
          <div>
            <button onClick={handleRequestClose}>Cancel</button>
            <button onClick={deleteAccount} style={{ color: 'red' }}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
