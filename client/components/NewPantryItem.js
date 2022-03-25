import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry';

const NewPantryItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [measure, setMeasure] = useState('');
  const [inputFields, setInputFields] = useState([
    { name: '', category: '', quantity: '', cost: '', measure: '' },
  ]);

  const { userId } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.pantry);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormChange = (index, e) => {
    e.preventDefault();
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    setInputFields([
      ...inputFields,
      {
        name: '',
        category: '',
        quantity: '',
        cost: '',
        measure: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPantryItemThunk({
        id,
        name,
        category,
        quantity,
        cost,
        measure,
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
                value={category}
                onChange={(e) => handleFormChange(index ,e.target.value)}
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

              <button onClick={addFields}>Add More Ingredients</button>
              <button onSubmit={handleSubmit}>Submit</button>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default NewPantryItem;
