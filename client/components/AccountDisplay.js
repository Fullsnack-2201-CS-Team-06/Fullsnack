import React from 'react';
import { useSelector } from 'react-redux';
import styles from './AccountDisplay.module.css';
import { Card, Table } from 'react-bootstrap';

const AccountDisplay = () => {
  const { username, email, cuisinePref, diet, health } = useSelector(
    (state) => state.auth
  );
  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <Card.Title>Hello {username}!</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Update your preferences here to see different recommendations
          </Card.Subtitle>
          <Table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td> {username}</td>
              </tr>
              <tr>
                <td>email:</td>
                <td>{email || 'No Email'}</td>
              </tr>
              <tr>
                <td>Cuisine:</td>
                <td>{cuisinePref || 'No Preference'}</td>
              </tr>
              <tr>
                <td>Diet Restrictions:</td>
                <td>{diet || 'No Preference'}</td>
              </tr>
              <tr>
                <td>Health Restrictions:</td>
                <td> {health || 'No Preference'}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccountDisplay;
