import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/auth';
import styles from './AccountUpdate.module.css';
import AccountPWUpdate from './AccountPWUpdate';

//Note: Correct typo in 'Japanese' in the model definition
const cuisines = [
  'American',
  'Asian',
  'British',
  'Caribbean',
  'Central Europe',
  'Chinese',
  'Eastern Europe',
  'French',
  'Indian',
  'Italian',
  'Japanse',
  'Kosher',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'South American',
  'South East Asian',
  'No Preference',
];

const diets = [
  'Balanced',
  'High-Fiber',
  'High-Protein',
  'Low-Carb',
  'Low-Fat',
  'Low-Sodium',
];

const AccountUpdate = () => {
  const { username, email, cuisinePref, diet, health } = useSelector(
    (state) => state.auth
  );

  const [newAccount, setNewAccount] = useState({
    username: username || '',
    email: email || '',
    cuisinePref: cuisinePref || '',
    diet: diet || '',
    health: health || '',
  });

  const [showPassword, setPassword] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    //Avoid email validation hook. If the email is blank, set to null to avoid input on model creation.
    if (newAccount.email.length === 0) {
      newAccount.email = null;
    }
    dispatch(update(newAccount));
  };

  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setPassword(true);
  };

  return showPassword ? (
    <AccountPWUpdate />
  ) : (
    <form className={styles.container}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={newAccount.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">email: </label>
        <input
          type="text"
          name="email"
          value={newAccount.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cuisinePref">Cuisine: </label>
        <select
          name="cuisinePref"
          value={newAccount.cuisinePref}
          onChange={handleChange}
        >
          {cuisines.map((cuisine, i) => (
            <option key={i} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="diet">Diet: </label>
        <select name="diet" value={newAccount.diet} onChange={handleChange}>
          <option value="">Choose A Diet Option</option>
          {diets.map((diet, i) => (
            <option key={i} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          name="diet"
          value={newAccount.diet}
          onChange={handleChange}
        /> */}
      </div>
      <div>
        <label htmlFor="health">Health: </label>
        <input
          type="text"
          name="health"
          value={newAccount.health}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={togglePassword}>
        Change Password
      </button>
      <button type="button" onClick={handleSubmit}>
        Submit Changes
      </button>
    </form>
  );
};

export default AccountUpdate;
