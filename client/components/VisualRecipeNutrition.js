import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryStack,
  VictoryVoronoiContainer
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';

const VisualRecipeNutrition = () => {
  const { id } = useSelector(state => state.auth)
  const { recipes } = useSelector(state => state)
  const dispatch = useDispatch();
  let dataset = []

  useEffect(() => {
    dispatch(fetchAllRecipes(id))
  }, [])

  if (recipes) {
   dataset = recipes.map((singleRecipe) => {
     console.log(typeof singleRecipe.caloriesPerRecipe)
     console.log(typeof singleRecipe.carbsPerRecipe)
      return [
      { x: 'calories', y: (singleRecipe.caloriesPerRecipe).toString() },
      { x: 'carbs', y: singleRecipe.carbsPerRecipe },
      { x: 'fats', y: singleRecipe.fatPerRecipe },
      { x: 'protein', y: singleRecipe.proteinPerRecipe },
      ]
    })
  }

  console.log('dataset', dataset)

  return (
    // <div style={{ height: '650px' }}>
    <>
      <VictoryChart
          domain={{ x: [0.5, 4.5], y: [0, 10] }}
          // width={'800'}
          // containerComponent={
          // <VictoryVoronoiContainer
          //   style={{}}
          //   labels={({})}
          // />
        // }
        >
        <VictoryLabel
          x={230}
          y={25}
          textAnchor="middle"
          text="Nutrition of My Recipe's"
          />
        <VictoryStack
          horizontal
          colorScale={[
            "#003f5c",
            "#2f4b7c",
            "#665191",
            "#a05195",
            "#d45087",
            "#f95d6a",
            "#ff7c43",
            "#ffa600"
          ]}
          style={{
            labels: { fontSize: 10 },
            data: { stroke: "black", strokeWidth: 1 },
            tickLabels: { fill: "none" },
          }}
          >
        {dataset.map((data, i) => {
          return <VictoryBar
          data={data}
          key={i}
          binSpacing={2}
             />;
          })}
        </VictoryStack>
      </VictoryChart>
      </>
  )
}

export default VisualRecipeNutrition
