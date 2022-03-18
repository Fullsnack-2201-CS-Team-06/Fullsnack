import React, { useEffect } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';

const Visuals = () => {
  const { username, id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const dispatch = useDispatch();

  const data = pantries.map((pantry) => {
    return pantry.ingredients.map((ingredient) => {
      return {
        item: ingredient.name,
        pantryQty: ingredient.pantryIngredient.pantryQty,
      };
    });
  });

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  return (
    <VictoryChart>
      <VictoryBar data={data} />
    </VictoryChart>
  );
};

export default Visuals;
