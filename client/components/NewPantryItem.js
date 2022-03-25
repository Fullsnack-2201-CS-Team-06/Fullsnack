import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry'

const NewPantryItem = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cost, setCost] = useState('')
    const [measure, setMeasure] = useState('')
    const [inputFields, setInputFields] = useState([
        { name: '', category: '', quantity: '', cost: '', measure: ''}
    ])

    const { userId } = useSelector((state) => state.auth)
    const { id } = useSelector((state) => state.pantry)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPantryItemThunk({
                id,
                name,
                category,
                quantity,
                cost,
                measure
            })
        );
        history.push(`/pantries/${id}`)
    }

    const handleFormChange = (index, e) => {
        let data = [...inputFields]
        data[index][e.target.name] = e.target.value
        setInputFields(data)
    }

    const addFields = () => {
        e.preventDefault();
        console.log("Add Ingredient Field Fired")
        let newField =  { name: '', category: '', quantity: '', cost: '', measure: ''}
        setInputFields([...inputFields, newField])
    }


    return(<div>
        <h1>Add Pantry Item</h1>

        <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Item Name'
                value={input.name}
                onChange={(e) => handleFormChange(index, e)}
              />
              <input
                name='category'
                placeholder='Category'
                value={input.category}
                onChange={(e) => handleFormChange(index, e)}
              />
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
            </div>
          )
        })}
      </form>






        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name</label>
            <input name="name" value={name} type="text" 
            onChange={(e) => setName(e.target.value)}></input>
            <label htmlFor="category">Category</label>
            <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Select Category
          </option>
          <option value="produce">Produce</option>
          <option value="meat">Meat</option>
          <option value="dairy">Dairy</option>
          <option value="dry goods">Dry Goods</option>
          <option value="bakery">Baked Goods</option>
          <option value="beverages">Beverages</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
            <label htmlFor="quantity">Quantity</label>
            <input name="quantity" value={quantity} type="text"
            onChange={(e) => setQuantity(e.target.value)}></input>
            <label htmlFor="cost">Cost</label>
            <input name="cost" value={cost} type="text"
            onChange={(e) => setCost(e.target.value)}></input>
            <label htmlFor="measurer">Measurer</label>
            <input name="measure" value={measure} type="text"
            onChange={(e) => setMeasure(e.target.value)}></input>
            <br />
            <button type="submit">Submit</button>
        </form>


        
    </div>
    
    
    )

}

export default NewPantryItem;