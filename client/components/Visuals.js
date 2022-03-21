import React, { useEffect } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';

const Visuals = () => {
  const { username, id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const dispatch = useDispatch();

  const data = pantries
    .map((pantry) => {
      return pantry.ingredients.map((ingredient) => {
        return {
          item: ingredient.name,
          pantryQty: Number(ingredient.pantryIngredient.pantryQty),
        };
      });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  return (
    <div>
      <label htmlFor="pantries">Choose a pantry: </label>
      <select name="pantries">
        <option value="">View All Pantries</option>
        {pantries.map((pantry) => (
          <option key={pantry.id} value={pantry.name}>
            {pantry.name}
          </option>
        ))}
      </select>
      <VictoryChart domainPadding={{ x: 15 }}>
        <VictoryBar data={data} x="item" y="pantryQty" />
      </VictoryChart>
    </div>
  );
};

export default Visuals;
