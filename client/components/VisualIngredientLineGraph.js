import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
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

  let ingredient1Data = []
  let ingredient2Data = []
  let ingredient3Data = []
  let ingredient4Data = []
  let ingredient5Data = []
  let listOfIngredients = {}

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id))
  }, [])

  useEffect(() => {
    // console.log('listOfIngredients')
    if (Object.keys(listOfIngredients).length && ingredient1 === '') {
      setIngredient1(Object.keys(listOfIngredients)[0])
      setIngredient2(Object.keys(listOfIngredients)[1])
      setIngredient3(Object.keys(listOfIngredients)[2])
      setIngredient4(Object.keys(listOfIngredients)[3])
      setIngredient5(Object.keys(listOfIngredients)[4])
    }
  }, [listOfIngredients])

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
    // <div style={{ height: '650px' }}>
    <>
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
        <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
        height={200}
        width={300}
        animate={{ duration: 500 }} >
        <VictoryLabel
          text="An item's quantity per Shopping List"
          x={225}
          y={30}
          textAnchor="end"
        />
        <VictoryGroup offset={45} >
        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          label={'List History'}
          crossAxis
          style={{
            tickLabels: { fontSize: 5 },
            axisLabel: {
              label: 'List History',
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
          label={'Quantity'}
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 5 },
            axisLabel: {
              label: 'quantity',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 6,
              padding: 30,
            },
          }}
        />
          <VictoryScatter
          style={{ data: { fill: "#c43a31" }, labels: { fill: "white", fontSize: 10}}} labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={8}/>}
          size={8} data={data1}
          />
          <VictoryScatter
          style={{ data: { fill: "#094f94" }, labels: { fill: "white", fontSize: 10}}} labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={8}/>}
          size={8} data={data2}
          />
          <VictoryScatter
          style={{ data: { fill: "#ffb600" }, labels: { fill: "white", fontSize: 10}}} labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={8}/>}
          size={8} data={data3}
          />
          <VictoryScatter
          style={{ data: { fill: "#2f4f4f" }, labels: { fill: "white", fontSize: 10}}} labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={8}/>}
          size={8} data={data4}
          />
          <VictoryScatter
          style={{ data: { fill: "#480607" }, labels: { fill: "white", fontSize: 10}}} labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={8}/>}
          size={8} data={data5}
          />
          </VictoryGroup>
        </VictoryChart>
    {/* </div> */}
    </>
  )
}

export default VisualIngredientLineGraph
