import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingListHistory } from '../store/ShoppingList';


const Visual2 = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { shoppingHistory } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id))
  }, [])

let data = []
let innerData = []

  if (shoppingHistory) {
    data = shoppingHistory.map(list => {
      return list.ingredients.map(item => {
        if (innerData.includes(item.name)) {
          console.log('we got milk')
        }
        innerData.push({ item :item.name, frequency: 1 })
          return { item :item.name, frequency: 1 }
      })
    })
  }

  innerData.forEach()

  console.log(innerData)

  return (
    <div style={{ height: '650px' }}>
      {/* <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
        height={200}
        width={300}
        animate={{ duration: 500 }}
      >
        <VictoryLabel
          text='frequent items bought'
          x={225}
          y={30}
          textAnchor="middle"
        />
        <VictoryBar data={data} />
        </VictoryChart> */}

    </div>
  )
}

export default Visual2
