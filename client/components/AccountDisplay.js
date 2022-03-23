import React from 'react';
import { useSelector } from 'react-redux';

const AccountDisplay = () => {
  const { username, email, cuisinePref, diet, health } = useSelector(
    (state) => state.auth
  );
  return (
    <div>
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
            <td>Cusine: </td>
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
