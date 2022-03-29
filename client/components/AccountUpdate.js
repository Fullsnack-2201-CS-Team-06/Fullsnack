import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/auth';
import styles from './AccountUpdate.module.css';
import AccountPWUpdate from './AccountPWUpdate';

//Note: Correct typo in 'Japanese' in the model definition
const cuisines = [
  'american',
  'asian',
  'british',
  'caribbean',
  'central europe',
  'chinese',
  'eastern europe',
  'french',
  'indian',
  'italian',
  'japanese',
  'kosher',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'south american',
  'south east asian',
];

const diets = [
  'balanced',
  'high-fiber',
  'high-protein',
  'low-carb',
  'low-fat',
  'low-sodium',
];

const healthOps = [
  'alcohol-cocktail',
  'alcohol-free',
  'celery-free',
  'crustacean-free',
  'dairy-free',
  'DASH',
  'egg-free',
  'fish-free',
  'fodmap-free',
  'gluten-free',
  'immuno-supportive',
  'keto-friendly',
  'kidney-friendly',
  'kosher',
  'low-potassium',
  'low-sugar',
  'lupine-free',
  'Mediterranean',
  'mollusk-free',
  'mustard-free',
  'No-oil-added',
  'paleo',
  'peanut-free',
  'pescatarian',
  'pork-free',
  'red-meat-free',
  'sesame-free',
  'shellfish-free',
  'soy-free',
  'sugar-conscious',
  'sulfite-free',
  '	tree-nut-free',
  'vegan',
  'vegetarian',
  'wheat-free',
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
          <option value="">Choose a Cuisine Option</option>
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
      </div>
      <div>
        <label htmlFor="health">Health: </label>
        <select name="health" value={newAccount.health} onChange={handleChange}>
          <option value="">Choose Health Restrictions</option>
          {healthOps.map((health, i) => (
            <option key={i} value={health}>
              {health}
            </option>
          ))}
        </select>
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
