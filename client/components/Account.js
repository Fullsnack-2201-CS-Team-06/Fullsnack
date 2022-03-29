import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AccountDisplay from './AccountDisplay';
import AccountUpdate from './AccountUpdate';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Account.module.css';
import { Button } from 'react-bootstrap';

const Account = () => {
  const [showForm, setFormStatus] = useState(false);
  const { auth } = useSelector((state) => state);

  //Switch between the normal view (AccountDisplay) and the form view (AccountUpdate) when users want to update their details.
  const toggleStatus = () => {
    setFormStatus(!showForm);
  };

  //If the user's details update, toggle the components in view.
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      toggleStatus();
    } else {
      didMount.current = true;
    }
  }, [auth]);

  return showForm ? (
    <div className={styles.container}>
      <AccountUpdate />
      <button type="button" onClick={toggleStatus}>
        Cancel
      </button>
    </div>
  ) : (
    <div className={styles.container}>
      <AccountDisplay />
      <Button variant="primary" onClick={toggleStatus}>
        Update
      </Button>
    </div>
  );
};

export default Account;
