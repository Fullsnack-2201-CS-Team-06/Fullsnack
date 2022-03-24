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

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPantryItem({
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
            <input name="category" value={category} type="text"
            onChange={(e) => setCategory(e.target.value)}></input></li>

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