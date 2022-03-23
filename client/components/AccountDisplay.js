import React from 'react';
import { useSelector } from 'react-redux';
import styles from './AccountDisplay.module.css';

const AccountDisplay = () => {
  const { username, email, cuisinePref, diet, health } = useSelector(
    (state) => state.auth
  );
  return (
    <div className={styles.container}>
      <h1>Hello {username}!</h1>
      <table>
        <tbody>
          <tr>
            <td>Username: </td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>email: </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Cuisine: </td>
            <td>{cuisinePref}</td>
          </tr>
          <tr>
            <td>Diet: </td>
            <td>{diet}</td>
          </tr>
          <tr>
            <td>Health: </td>
            <td>{health}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountDisplay;
