import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItem } from '../store/pantry'

const newPantryItem = () => {
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
            addPantryItem({
                id,
                name,
                category,
                quantity,
                cost,
                measure
            })
        )
    }

    return(<div>
        <h1>Add Pantry Item</h1>
        <form onSubmit={handleSubmit}>
            <ul>
            <li><label htmlFor="name">Item Name</label>
            <input name="name" value={name} type="text" 
            onChange={(e) => setName(e.target.value)}></input></li>

            <li><label htmlFor="category">Category</label>
            <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Select Cuisine Type
          </option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central Europe">Central Europe</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="French">French</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Kosher">Kosher</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="South American">South American</option>
          <option value="South East Asian">South East Asian</option>
          <option value="None">None</option>
        </select></li>

            <li><label htmlFor="quantity">Quantity</label>
            <input name="quantity" value={quantity} type="text"
            onChange={(e) => setQuantity(e.target.value)}></input></li>

            <li><label htmlFor="cost">Cost</label>
            <input name="cost" value={cost} type="text"
            onChange={(e) => setCost(e.target.value)}></input></li>

            <li><label htmlFor="measurer">Measurer</label>
            <input name="measure" value={measure} type="text"
            onChange={(e) => setMeasure(e.target.value)}></input></li>

            </ul>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>)

}

export default newPantryItem;