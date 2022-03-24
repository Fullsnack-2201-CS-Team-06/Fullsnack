import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/auth';
import styles from './AccountUpdate.module.css';

const AccountPWUpdate = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState({
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newPassword.password1 === newPassword.password2) {
      dispatch(update({ password: newPassword.password1 }));
    } else {
      throw new Error('These passwords do not match.');
    }
  };

  return (
    <form className={styles.container}>
      <div>
        <label htmlFor="password1">New Password: </label>
        <input
          type="password"
          name="password1"
          value={newPassword.password1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password2">Re-Enter New Password: </label>
        <input
          type="password"
          name="password2"
          value={newPassword.password2}
          onChange={handleChange}
        />
      </div>
      <p>
        Password Match:{' '}
        {newPassword.password1 === newPassword.password2 &&
        newPassword.password1.length > 0
          ? 'YES'
          : 'NO'}
      </p>
      <button type="button" onClick={handleSubmit}>
        Submit Changes
      </button>
    </form>
  );
};

export default AccountPWUpdate;
