import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';
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
        category: ingredient.category,
      };
    });

    return {
      name: pantry.name,
      contents: contents,
    };
  });

  console.log("Here's state", pantries);

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

  // console.log('Bar chart data: ', data);

  function groupByCategory(data) {
    let categoricalData = {};
    data.map((item) => {
      if (categoricalData[item.category]) {
        categoricalData[item.category] += item.pantryQty;
      } else {
        categoricalData[item.category] = item.pantryQty;
      }
    });
    categoricalData = Object.keys(categoricalData).map((key) => ({
      category: key,
      quantity: categoricalData[key],
    }));
    return categoricalData;
  }

  const categoricalData = groupByCategory(data);

  return (
    // <div style={{ height: '650px' }}>
    <>
      {/* <div> */}
      <select name="pantries" onChange={(e) => handlePantryChange(e)}>
        <option value="View All Pantries">View All Pantries</option>
        {pantries.map((pantry) => (
          <option key={pantry.id} value={pantry.name}>
            {pantry.name}
          </option>
        ))}
      </select>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
        height={500}
        width={700}
        animate={{ duration: 500 }}
      >
        <VictoryLabel
          text={
            selectedPantry === 'View All Pantries'
              ? 'Quantities of Foods in All Your Pantries'
              : `Quantities of Foods in Your ${selectedPantry} Pantry`
          }
          x={350}
          y={30}
          textAnchor="middle"
          style={{ fontSize: 25 }}
        />
        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          label={'My Food'}
          crossAxis
          style={{
            tickLabels: {
              angle: -45,
              fontSize: 10,
              textAnchor: 'end',
              padding: 2,
            },
            axisLabel: {
              label: 'My Food',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 20,
              padding: 80,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel />}
          label={'Quantity'}
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 5 },
            axisLabel: {
              label: 'Quantity',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 20,
              padding: 30,
            },
          }}
        />
        <VictoryBar
          barWidth={({ index }) => index * 2 + 12}
          data={categoricalData}
          x="category"
          y="quantity"
        />
      </VictoryChart>
    </>
  );
};

export default Visuals;
