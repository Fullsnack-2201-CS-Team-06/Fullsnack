import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';

const VisualRecipeNutrition = () => {
  const { id } = useSelector(state => state.auth)
  const { recipes } = useSelector(state => state)
  const dispatch = useDispatch();
  let protein = []
  let carbs = []
  let fats = []
  let calorie = []

  useEffect(() => {
    dispatch(fetchAllRecipes(id))
  }, [])

  if (recipes) {
    recipes.forEach((singleRecipe, index) => {
      calorie.push({ x: index, y: singleRecipe.caloriesPerRecipe })
      carbs.push({ x: index, y: singleRecipe.carbsPerRecipe })
      fats.push({ x: index, y: singleRecipe.fatPerRecipe })
      protein.push({ x: index, y: singleRecipe.proteinPerRecipe })
    })
  }

  console.log('protein', protein)

  return (
    <div style={{ height: '650px' }}>
      <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [0.5, 10.5] }}
        >
          <VictoryGroup horizontal
            offset={10}
            style={{ data: { width: 6 } }}
            colorScale={["brown", "tomato", "gold", "red"]}
          >
            <VictoryBar
              data={calorie}
            />
            <VictoryBar
              data={protein}
            />
            <VictoryBar
              data={fats}
            />
            <VictoryBar
              data={carbs}
            />
          </VictoryGroup>
        </VictoryChart>
    </div>
  )
}

export default VisualRecipeNutrition
