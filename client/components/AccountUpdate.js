import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/auth';

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

const AccountUpdate = () => {
  const { username, email, cuisinePref, diet, health } = useSelector(
    (state) => state.auth
  );

  const [newAccount, setNewAccount] = useState({
    username,
    email,
    cuisinePref,
    diet,
    health,
  });

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(update(newAccount));
  };

  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  return (
    <form>
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
        <input
          type="text"
          name="diet"
          value={newAccount.diet}
          onChange={handleChange}
        />
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
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default AccountUpdate;
