import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountDisplay from './AccountDisplay';

const Account = () => {
  const [formStatus, setFormStatus] = useState(false);

  const toggleStatus = () => {
    setFormStatus(!formStatus);
  };

  return (
    <div>
      <AccountDisplay />
      <button type="button" onClick={toggleStatus}>
        Update
      </button>
    </div>
  );
};

export default Account;
