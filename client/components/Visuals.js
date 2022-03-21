import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';

const Visuals = () => {
  const { username, id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);

  const [selectedPantry, setSelectedPantry] = useState('View All Pantries');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  let data = pantries.map((pantry) => {
    const contents = pantry.ingredients.map((ingredient) => {
      return {
        item: ingredient.name,
        pantryQty: ingredient.pantryIngredient.pantryQty,
      };
    });

    return {
      name: pantry.name,
      contents: contents,
    };
  });

  const selectPantry = (pantries, pantryName) => {
    const selectedPantry = pantries.filter(
      (pantry) => pantry.name === pantryName
    );
    return selectedPantry[0].contents;
  };

  const reducePantries = (pantries) => {
    return pantries.reduce((prev, curr) => {
      return prev.concat(curr.contents);
    }, []);
  };

  if (selectedPantry === 'View All Pantries') {
    data = reducePantries(data);
  } else {
    data = selectPantry(data, selectedPantry);
  }

  const handlePantryChange = (e) => {
    setSelectedPantry(e.target.value);
  };

  return (
    <div>
      <select name="pantries" onChange={(e) => handlePantryChange(e)}>
        <option value="View All Pantries">View All Pantries</option>
        {pantries.map((pantry) => (
          <option key={pantry.id} value={pantry.name}>
            {pantry.name}
          </option>
        ))}
      </select>
      <VictoryChart>
        <VictoryBar data={data} x="item" y="pantryQty" />
      </VictoryChart>
    </div>
  );
};

export default Visuals;
