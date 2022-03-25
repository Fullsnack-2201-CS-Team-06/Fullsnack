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

    return(<div>
        <h1>Add Pantry Item</h1>
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
    </div>)

}

export default NewPantryItem;