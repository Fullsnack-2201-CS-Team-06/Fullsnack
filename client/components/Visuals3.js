import React, { useEffect, useState } from 'react';
import {
    VictoryPie
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';


const Visuals3 = () => {
    const { username, id } = useSelector((state) => state.auth);
    const { pantries } = useSelector((state) => state);

    const [selectedPantry, setSelectedPantry] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPantries(id))
    }, []);

    console.log("Here's STATE", pantries.ingredients)

    let data = pantries.ingredients.map((foodItem) => {
        return {
            category: foodItem.category
        }
    });

    return(
        <VictoryPie/>
    )
}

export default Visuals3