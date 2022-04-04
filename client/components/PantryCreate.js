import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllPantries, createNewPantry } from '../store/pantries';
import { Button, Form } from 'react-bootstrap';
import styles from './PantryCreate.module.css';

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
    let data = [...inputField];
    data[index][e.target.name] = e.target.value;
    setInputField(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewPantry(inputField, id));
  };

  return (
    <Form className={styles.pantryForm} onSubmit={handleSubmit}>
      {inputField.map((input, index) => {
        return (
          <div key={index}>
            <Form.Control
              name="name"
              type="text"
              placeholder="Create Pantry"
              value={input.name}
              onChange={(e) => handleFormChange(index, e)}
            />
          </div>
        );
      })}
      <Button className={styles.button} onClick={handleSubmit}>
        Create Pantry
      </Button>
    </Form>
  );
};

export default PantryCreate;
