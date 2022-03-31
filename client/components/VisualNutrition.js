import React, { useEffect, useState, useRef } from 'react';
import {
  VictoryChart,
  VictoryBoxPlot,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';

const VisualNutrition = () => {
  const { foods } = useSelector((state) => state);
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setDidLoad(true);
    } else {
      didMount.current = true;
    }
  }, [foods]);

  const data = foods
    .filter((food) => food.category !== 'miscellaneous')
    .map((food) => ({
      x: food.category,
      y: Number(food.caloriesPerUnit),
    }));

  return didLoad ? (
    // <div style={{ height: '700px' }}>
    <>
      <VictoryChart
        domainPadding={{ x: 20 }}
        height={500}
        width={700}
        animate={{
          duration: 2000,
        }}
        // scale={{ x: 'category' }}
      >
        <VictoryLabel
          text="Calorie Range of Foods"
          x={350}
          y={30}
          textAnchor="middle"
          style={{ fontSize: 25 }}
        />
        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          label={'Food Categories'}
          crossAxis
          style={{
            tickLabels: {
              angle: -45,
              fontSize: 12,
              textAnchor: 'end',
              padding: 2,
            },
            axisLabel: {
              label: 'Food Categories',
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
          label={'Calories Per Unit'}
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 5 },
            axisLabel: {
              label: 'Calories Per Unit',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 20,
              padding: 30,
            },
          }}
        />
        <VictoryBoxPlot boxWidth={5} whiskerWidth={5} data={data} />
      </VictoryChart>
    </>
  ) : (
    <div></div>
  );
};

export default VisualNutrition;
