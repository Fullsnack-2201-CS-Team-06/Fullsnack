import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AccountDisplay from './AccountDisplay';
import AccountUpdate from './AccountUpdate';

const Account = () => {
  const [showForm, setFormStatus] = useState(false);
  const { auth } = useSelector((state) => state);

  const toggleStatus = () => {
    setFormStatus(!showForm);
  };

  const didMount = useRef(false);
  const prevAuth = useRef(auth);
  useEffect(() => {
    if (didMount.current) {
      console.log('toggleStatus();');
      toggleStatus();
    } else {
      console.log('didMount.current = true;');
      didMount.current = true;
    }
  }, [auth]);

  return showForm ? (
    <div>
      <AccountUpdate />
      <button type="button" onClick={toggleStatus}>
        Cancel
      </button>
    </div>
  ) : (
    <div>
      <AccountDisplay />
      <button type="button" onClick={toggleStatus}>
        Update
      </button>
    </div>
  );
};

export default Account;
