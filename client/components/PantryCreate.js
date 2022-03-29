import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchAllPantries, createNewPantry } from '../store/pantries';
import PantrySingle from './PantrySingle'

const PantryCreate = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const [inputField, setInputField] = useState([{ name: '' }]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  const handleFormChange = (index, e) => {
    let data = [...inputField]
    data[index][e.target.name] = e.target.value
    setInputField(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewPantry(inputField, id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputField.map((input, index) => {
          return (
            <div key={index}>
              <input name='name' placeholder='Create Pantry' value={input.name} onChange={(e) => handleFormChange(index, e)}/>
            </div>
          );
        })}
      <button onClick={handleSubmit}>Create Pantry</button>
      </form>

      {pantries.length > 0 ? (
        pantries.map((pantry) => {
          return (
            <li key={pantry.id}>
              <Link to={`/pantries/${pantry.id}`}>{pantry.name}</Link>
            </li>
          );
        })
      ) : (
        <div>Nothing to show</div>
      )}
      <PantrySingle/>
    </div>
  );
};

export default PantryCreate;
