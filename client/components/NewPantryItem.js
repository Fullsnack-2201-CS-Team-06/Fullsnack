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

    return(<div>
        <h1>Add Pantry Item</h1>
        <form>
            <ul>
            <li><label htmlFor="name">Item Name</label>
            <input type="text"></input></li>
            <li><label htmlFor="name">Category</label>
            <input type="text"></input></li>
            <li><label htmlFor="name">Quantity</label>
            <input type="text"></input></li>
            <li><label htmlFor="name">Cost</label>
            <input type="text"></input></li>
            <li><label htmlFor="name">Measurer</label>
            <input type="text"></input></li>
            </ul>
        </form>
    </div>)

}

export default newPantryItem;