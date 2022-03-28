import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry';

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
      <br/>
      <br/>
      <h1>Add Pantry Item</h1>

      <form onSubmit={handleSubmit}><ul></ul>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <label htmlFor='Item Name'>Item Name</label>
              <input
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

              <select
                name='category'
                value={input.category}
                onChange={(e) => handleFormChange(index, e)}
              >
                <label htmlFor='Category'>Category</label>
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

              <label htmlFor='Quantity'>Quantity</label>
              <input
                type='number'
                name='quantity'
                placeholder='Quantity'
                value={input.quantity}
                onChange={(e) => handleFormChange(index, e)}
              />

              <label htmlFor='Cost'>Cost</label>
              <input
                type='number'
                name='cost'
                placeholder='Cost'
                value={input.cost}
                onChange={(e) => handleFormChange(index, e)}
              />

              <label htmlFor='Measure'>Measure</label>
              <input
                name='measure'
                placeholder='Measure'
                value={input.measure}
                onChange={(e) => handleFormChange(index, e)}
              />
              <button type='button' onClick={() => removeFields(index)}>
                Remove
              </button>
            </div>
          );
        })}
        <br />
        <button type='button' onClick={() => addFields()}>
          Add More Ingredients
        </button>
        <button type='submit' onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default NewPantryItem;
