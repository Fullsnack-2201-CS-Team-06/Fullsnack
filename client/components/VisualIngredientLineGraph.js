import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryLine,
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingListHistory } from '../store/ShoppingList';

const VisualIngredientLineGraph = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { shoppingHistory } = useSelector((state) => state.shoppingList);
  const [ingredient1, setIngredient1] = useState('wine')
  const [ingredient2, setIngredient2] = useState('carrot')
  const [ingredient3, setIngredient3] = useState('bourbon')
  const [ingredient4, setIngredient4] = useState('tofu')
  const [ingredient5, setIngredient5] = useState('eggs')

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id))
  }, [])

let ingredient1Data = []
let ingredient2Data = []
let ingredient3Data = []
let ingredient4Data = []
let ingredient5Data = []
let tempData = []
let listOfIngredients = {}

if (shoppingHistory) {
  shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach((item) => {
        if (item.name === ingredient1) {
          ingredient1Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
        if (item.name === ingredient2) {
          ingredient2Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
        if (item.name === ingredient3) {
          ingredient3Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
        if (item.name === ingredient4) {
          ingredient4Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
        if (item.name === ingredient5) {
          ingredient5Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
        if (listOfIngredients[item.name]) {
          return
        } else {
          listOfIngredients[item.name] = 1
        }
      })
    })
  }

  console.log('its a list of ingredients', Object.keys(listOfIngredients))

  return (
    <div style={{ height: '650px' }}>
      <VictoryGroup offset={25} colorScale={["tomato", "orange", "gold", 'blue', 'green']} >
        <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
        height={200}
        width={300}
        animate={{ duration: 500 }} >
        <VictoryLabel
          text='items bought over time on shopping lists'
          x={225}
          y={30}
          textAnchor="middle"
        />
        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          label={'My Food'}
          crossAxis
          style={{
            tickLabels: {
              angle: -45,
              fontSize: 5,
            },
            axisLabel: {
              label: 'My Food',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 6,
              padding: 30,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel />}
          label={'Frequency'}
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 5 },
            axisLabel: {
              label: 'frequency',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 6,
              padding: 30,
            },
          }}
        />
          <VictoryLine data={ingredient1Data} />
          <VictoryLine data={ingredient2Data} />
          <VictoryLine data={ingredient3Data} />
          <VictoryLine data={ingredient4Data} />
          <VictoryLine data={ingredient5Data} />
        </VictoryChart>
      </VictoryGroup>
    </div>
  )
}

export default VisualIngredientLineGraph
