import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/auth';
import styles from './AccountUpdate.module.css';
import { Card, Table, Button, Popover, OverlayTrigger } from 'react-bootstrap';

const AccountPWUpdate = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState({
    password1: '',
    password2: '',
  });
  const [fail, setfail] = useState(false);

  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    setfail(false);
  };

  const handleSubmit = () => {
    if (newPassword.password1 === newPassword.password2) {
      dispatch(update({ password: newPassword.password1 }));
    } else {
      setfail(true);
      setTimeout(() => {
        setfail(false);
      }, 5000);
    }
  };

  const popover = fail ? (
    <Popover id="popover-basic">
      <Popover.Body>Invalid Password</Popover.Body>
    </Popover>
  ) : (
    <div></div>
  );

  return (
    <Card className={styles.container}>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="password1">New Password: </label>
              </td>
              <td>
                <input
                  type="password"
                  name="password1"
                  value={newPassword.password1}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password2">Re-Enter New Password: </label>
              </td>
              <td>
                <input
                  type="password"
                  name="password2"
                  value={newPassword.password2}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password Match:</td>
              <td>
                {newPassword.password1 === newPassword.password2 &&
                newPassword.password1.length > 0
                  ? 'YES'
                  : 'NO'}
              </td>
            </tr>
          </tbody>
        </Table>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button type="success" onClick={handleSubmit}>
            Submit Changes
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default AccountPWUpdate;
