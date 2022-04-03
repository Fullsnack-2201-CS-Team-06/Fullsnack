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
    <div className={styles.page}>
      <div className={styles.container}>
        <AccountUpdate />
        <Button
          className={styles.buttonOutline}
          variant="outline-primary"
          onClick={toggleStatus}
        >
          Cancel
        </Button>
      </div>
      <div>
        <img className={styles.image} src="/salmon.jpg" />
      </div>
    </div>
  ) : (
    <div className={styles.page}>
      <div className={styles.container}>
        <AccountDisplay />
        <Button
          className={styles.button}
          variant="primary"
          onClick={toggleStatus}
        >
          Update
        </Button>
      </div>
      <div>
        <img className={styles.image} src="/salmon.jpg" />
      </div>
    </div>
  );
};

export default Account;
