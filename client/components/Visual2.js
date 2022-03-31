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
let tempData = {}
let finalData = []

  if (shoppingHistory) {
    data = shoppingHistory.map(list => {
      return list.ingredients.map(item => {
        innerData.push(item.name)
        return item.name
      })
    })
  }

  innerData.forEach(item => {
    if (tempData[item]) {
      tempData[item] += 1
    } else {
      tempData[item] = 1
    }
  })

  for (const [key, value] of Object.entries(tempData)) {
    finalData.push({item: key, frequency: value})
  }

  return (
    <div style={{ height: '650px' }}>
      <VictoryChart
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
        <VictoryBar data={finalData} x='item' y='frequency' />
        </VictoryChart>
    </div>
  )
}

export default Visual2
