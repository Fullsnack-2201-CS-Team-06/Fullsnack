import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry';

const NewPantryItem = () => {
  const { userId } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.pantry);
  const [inputFields, setInputFields] = useState([
    { name: '', category: '', quantity: '', cost: '', measure: '' },
  ]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newField =  {
        name: '',
        category: '',
        quantity: '',
        cost: '',
        measure: '',
      }
    setInputFields([
      ...inputFields,
     newField
    ]);
  };

  const removeFields = (index) => {
    let data = [...inputFields]
    data.splice(index, 1)
    setInputFields(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Did HS fire")
    dispatch(
      addPantryItemThunk({
        id,
        inputFields
      })
    );
    history.push(`/pantries/${id}`);
  };

  return (
    <div>
      <h1>Add Pantry Item</h1>

      <form onSubmit={handleSubmit}>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Item Name'
                value={input.name}
                onChange={(e) => handleFormChange(index, e)}
              />
              <select
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
              <input
                name='quantity'
                placeholder='Quantity'
                value={input.quantity}
                onChange={(e) => handleFormChange(index, e)}
              />
              <input
                name='cost'
                placeholder='Cost'
                value={input.cost}
                onChange={(e) => handleFormChange(index, e)}
              />
              <input
                name='measure'
                placeholder='Measure'
                value={input.measure}
                onChange={(e) => handleFormChange(index, e)}
              />

              <button type="button" onClick={() => addFields()}>Add More Ingredients</button>
              <button type="submit" onClick={handleSubmit}>Submit</button>
              <button type="button" onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default NewPantryItem;
