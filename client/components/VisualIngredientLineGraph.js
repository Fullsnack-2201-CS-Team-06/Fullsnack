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
  const [ingredient1, setIngredient1] = useState('')
  const [data1, setData1] = useState([])
  const [ingredient2, setIngredient2] = useState('')
  const [data2, setData2] = useState([])
  const [ingredient3, setIngredient3] = useState('')
  const [data3, setData3] = useState([])
  const [ingredient4, setIngredient4] = useState('')
  const [data4, setData4] = useState([])
  const [ingredient5, setIngredient5] = useState('')
  const [data5, setData5] = useState([])

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id))
  }, [])

let ingredient1Data = []
let ingredient2Data = []
let ingredient3Data = []
let ingredient4Data = []
let ingredient5Data = []
let listOfIngredients = {}

if (shoppingHistory) {
  shoppingHistory.forEach(list => {
    list.ingredients.forEach(item => {
      if (listOfIngredients[item.name]) {
        return
      } else {
        listOfIngredients[item.name] = 1
      }
    })
  })
}

  const handleIngredient1Change = (e) => {
    setIngredient1(e.target.value)
    shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach(item => {
        if (item.name === ingredient1) {
          ingredient1Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
      })
      setData1(ingredient1Data)
    })
  }
  const handleIngredient2Change = (e) => {
    setIngredient2(e.target.value)
    shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach(item => {
        if (item.name === ingredient2) {
          ingredient2Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
      })
      setData2(ingredient2Data)
    })
  }
  const handleIngredient3Change = (e) => {
    setIngredient3(e.target.value)
    shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach(item => {
        if (item.name === ingredient3) {
          ingredient3Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
      })
      setData3(ingredient3Data)
    })
  }
  const handleIngredient4Change = (e) => {
    setIngredient4(e.target.value)
    shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach(item => {
        if (item.name === ingredient4) {
          ingredient4Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
      })
      setData4(ingredient4Data)
    })
  }
  const handleIngredient5Change = (e) => {
    setIngredient5(e.target.value)
    shoppingHistory.forEach((list, idx) => {
      list.ingredients.forEach(item => {
        if (item.name === ingredient5) {
          ingredient5Data.push({ x: idx + 1, y: item.shoppingListIngredient.sliQuantity})
        }
      })
      setData5(ingredient5Data)
    })
  }

  return (
    <div style={{ height: '650px' }}>
      <select name="ingredient1" onChange={(e) => handleIngredient1Change(e)}>
        <option value="View All Pantries">Select First Ingredient</option>
        {Object.keys(listOfIngredients).map((ingredient, idx) => (
          <option key={idx} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <select name="ingredient1" onChange={(e) => handleIngredient2Change(e)}>
        <option value="View All Pantries">Second Ingredient</option>
        {Object.keys(listOfIngredients).map((ingredient, idx) => (
          <option key={idx} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <select name="ingredient1" onChange={(e) => handleIngredient3Change(e)}>
        <option value="View All Pantries">Third Ingredient</option>
        {Object.keys(listOfIngredients).map((ingredient, idx) => (
          <option key={idx} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <select name="ingredient1" onChange={(e) => handleIngredient4Change(e)}>
        <option value="View All Pantries">Fourth Ingredient</option>
        {Object.keys(listOfIngredients).map((ingredient, idx) => (
          <option key={idx} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <select name="ingredient1" onChange={(e) => handleIngredient5Change(e)}>
        <option value="View All Pantries">Fifth Ingredient</option>
        {Object.keys(listOfIngredients).map((ingredient, idx) => (
          <option key={idx} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
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
          <VictoryLine data={data1} />
          <VictoryLine data={data2} />
          <VictoryLine data={data3} />
          <VictoryLine data={data4} />
          <VictoryLine data={data5} />
        </VictoryChart>
      </VictoryGroup>
    </div>
  )
}

export default VisualIngredientLineGraph
