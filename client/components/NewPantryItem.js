import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry';
import styles from './NewPantryItem.module.css';

const NewPantryItem = () => {
  const { userId } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.pantry);
  const { foods } = useSelector((state) => state);

  const [inputFields, setInputFields] = useState([
    {
      name: '',
      category: '',
      quantity: '',
      cost: '',
      measure: '',
    },
  ]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);

    if (e.target.name === 'name') {
      const foodNames = foods.map((food) => food.name);
      if (foodNames.includes(e.target.value)) {
        const existingFood = foods.filter(
          (food) => food.name === e.target.value
        );
        const existingUOM = existingFood[0]['uom'];
        data[index]['uom'] = existingUOM;
        setInputFields(data);
      }
    }
  };

  const addFields = () => {
    let newField = {
      name: '',
      category: '',
      quantity: '',
      cost: '',
      measure: '',
    };
    setInputFields([...inputFields, newField]);
    history.push(`/pantries/${id}`);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPantryItemThunk({
        id,
        inputFields,
      })
    );
    history.push(`/pantries/${id}`);
    setInputFields([
      {
        name: '',
        category: '',
        quantity: '',
        cost: '',
        measure: '',
      },
    ]);
  };

  return (
    <div>
      <br />
      <br />
      <div className={styles.newPantryItem}>
        <div className={styles.newPantryItemForm}>
          <h3 className={styles.newPantry}>Add Items</h3>
          <form onSubmit={handleSubmit}>
            <ul></ul>
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <label className={styles.label} htmlFor='Item Name'>
                    Item Name
                  </label>
                  <input
                    className={styles.input}
                    name='name'
                    list='allFoods'
                    placeholder='Item Name'
                    value={input.name}
                    onChange={(e) => handleFormChange(index, e)}
                    autoComplete='on'
                  />

                  <datalist id='allFoods'>
                    {foods.map((food) => (
                      <option key={food.id}>{food.name}</option>
                    ))}
                  </datalist>

                  <label className={styles.label} htmlFor='Category'>
                    Category
                  </label>
                  <select
                    className={styles.input}
                    name='category'
                    value={input.category}
                    onChange={(e) => handleFormChange(index, e)}
                  >
                    <option value='' disabled selected>
                      Select Category
                    </option>
                    <option value='produce'>Produce</option>
                    <option value='meat'>Meat</option>
                    <option value='dairy'>Dairy</option>
                    <option value='dry goods'>Dry Goods</option>
                    <option value='bakery'>Baked Goods</option>
                    <option value='beverages'>Beverages</option>
                    <option value='miscellaneous'>Miscellaneous</option>
                  </select>

                  <label className={styles.label} htmlFor='Quantity'>
                    Quantity
                  </label>
                  <input
                    className={styles.input}
                    type='number'
                    name='quantity'
                    placeholder='Quantity'
                    value={input.quantity}
                    onChange={(e) => handleFormChange(index, e)}
                  />
                  <button
                    className={styles.button}
                    type='button'
                    onClick={() => removeFields(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            <br />
            <div className={styles.bottom}>
              <button
                className={styles.button}
                type='button'
                onClick={() => addFields()}
              >
                Add More Ingredients
              </button>
              <button
                className={styles.button}
                type='submit'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPantryItem;
