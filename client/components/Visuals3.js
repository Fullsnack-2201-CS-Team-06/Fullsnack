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

    

/**
 *  It would be nice to see divide the number of total items in a pantry
 *  by the number of categories and see what the spread is there.
 * 
 * 
 * 
 *  I need a function that'll give me pantryQuantity totals
 * and keep track of categories 
 * you could create a property corresponding to a category
 * fill that with the pantry Quantity
 * 
 * 
 */

const selectPantry = ()



    let data = pantries.map((pantry) => {
        const contents = pantry.ingredients.map((ingredient) => {
            return{
                item: ingredient.name,
                category: ingredient.category,
                pantryQty: ingredient.pantryIngredient.pantryQty,
            }
        })

        return{
            name: pantry.name,
            contents: contents
        }
    })

    console.log("Here's STATE", data)

    return(
        <div>Nothing yet</div>
    )
}

export default Visuals3