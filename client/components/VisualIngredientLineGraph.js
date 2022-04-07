import React, { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryLine,
  VictoryLegend,
} from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingListHistory } from '../store/ShoppingList';

const VisualIngredientLineGraph = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { shoppingHistory } = useSelector((state) => state.shoppingList);
  const [ingredient1, setIngredient1] = useState('wine');
  const [ingredient2, setIngredient2] = useState('carrot');
  const [ingredient3, setIngredient3] = useState('bourbon');
  const [ingredient4, setIngredient4] = useState('tofu');
  const [ingredient5, setIngredient5] = useState('eggs');
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id));
  }, []);

  let ingredient1Data = [];
  let ingredient2Data = [];
  let ingredient3Data = [];
  let ingredient4Data = [];
  let ingredient5Data = [];
  let tempData = [];

  if (shoppingHistory) {
    shoppingHistory.forEach((list) => {
      list.ingredients.forEach((item) => {
        if (item.name === ingredient1) {
          ingredient1Data.push({
            item: item.name,
            quantity: item.shoppingListIngredient.sliQuantity,
          });
        }
        if (item.name === ingredient2) {
          ingredient2Data.push({
            item: item.name,
            quantity: item.shoppingListIngredient.sliQuantity,
          });
        }
        if (item.name === ingredient3) {
          ingredient3Data.push({
            item: item.name,
            quantity: item.shoppingListIngredient.sliQuantity,
          });
        }
        if (item.name === ingredient4) {
          ingredient4Data.push({
            item: item.name,
            quantity: item.shoppingListIngredient.sliQuantity,
          });
        }
        if (item.name === ingredient5) {
          ingredient5Data.push({
            item: item.name,
            quantity: item.shoppingListIngredient.sliQuantity,
          });
        }
        tempData.push(item.name);
      });
    });
  }

  let shoppingHistoryData = shoppingHistory || [];
  useEffect(() => {
    function groupShoppingHistoryNutrition(shoppingHistoryData) {
      //listNutrition = {[date]: [calories,fats,protein,carbs]}
      const listNutrition = {};
      shoppingHistoryData.map((list) => {
        const date =
          list.checkoutDate.split(', ')[1] +
          ' ' +
          list.createdAt.split('T')[1].slice(0, 5);
        listNutrition[date] = [0, 0, 0];
        list.ingredients.map((ingredient) => {
          listNutrition[date][0] += Number(ingredient.fatsPerUnit);
          listNutrition[date][1] += Number(ingredient.proteinPerUnit);
          listNutrition[date][2] += Number(ingredient.carbsPerUnit);
        });
      });
      console.log('listNutrition: ', listNutrition);
      const nutritionCategories = [
        'fatsPerUnit',
        'proteinPerUnit',
        'carbsPerUnit',
      ];
      return nutritionCategories.map((nutrition, i) => {
        return Object.keys(listNutrition).map((date) => {
          return {
            x: date,
            y: listNutrition[date][i],
            nutrition: nutrition,
          };
        });
      });
    }
    if (shoppingHistory) {
      //Limit the chart results to the last four shopping lists.
      shoppingHistoryData =
        shoppingHistory.length > 4
          ? shoppingHistory.slice(-4)
          : shoppingHistory;
      setGroupedData(groupShoppingHistoryNutrition(shoppingHistoryData));
      //categories = {'dairy': [1,2,3]}
      // const categories = {};
      // console.log('shoppingHistoryData: ', shoppingHistoryData);
      // shoppingHistoryData.map((list, i) => {
      //   list.ingredients.map((ingredient) => {
      //     const category = ingredient.category;
      //     const quantity = ingredient.shoppingListIngredient.sliQuantity;
      //     if (!categories[category]) {
      //       categories[category] = new Array(shoppingHistoryData.length).fill(
      //         0
      //       );
      //     }
      //     categories[category][i] += quantity;
      //   });
      // });
      // console.log('categories: ', categories);
      // return Object.keys(categories).map((category) => {
      //   return categories[category].map((listQuantity, i) => {
      //     // return { x: category, y: listQuantity, };
      //     return {
      //       x: shoppingHistoryData[i].createdAt,
      //       y: listQuantity,
      //       category: category,
      //     };
      //   });
      // });
    }
  }, [shoppingHistory]);
  console.log('groupedData: ', groupedData);

  return (
    <div style={{ height: '650px' }}>
      <VictoryChart
        domainPadding={{ x: 20 }}
        height={400}
        width={600}
        animate={{ duration: 500 }}
      >
        <VictoryLegend
          x={410}
          y={60}
          title="Legend"
          centerTitle
          orientation="vertical"
          gutter={20}
          style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
          data={[
            { name: 'Fats', symbol: { fill: 'tomato' } },
            { name: 'Protein', symbol: { fill: 'orange' } },
            { name: 'Carbs', symbol: { fill: 'gold' } },
          ]}
        />
        <VictoryLabel
          text="Nutrition of Shopping Lists"
          x={300}
          y={40}
          textAnchor="middle"
          style={{ fontSize: 25 }}
        />
        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          label={'Shopping List'}
          crossAxis
          style={{
            tickLabels: {
              angle: -45,
              fontSize: 8,
              textAnchor: 'end',
              padding: 2,
            },
            axisLabel: {
              label: 'Shopping List',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 18,
              padding: 70,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel />}
          label={'grams'}
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 10 },
            axisLabel: {
              label: 'grams',
              fontFamily: 'inherit',
              fontWeight: 100,
              letterSpacing: '1px',
              fontSize: 20,
              padding: 30,
            },
          }}
        />
        <VictoryGroup
          offset={10}
          colorScale={['tomato', 'orange', 'gold']}
          // labels={shoppingHistoryData.map((list) => list.checkoutDate)}
        >
          {groupedData.map((list, i) => (
            <VictoryBar
              key={i}
              data={list}
              barWidth={10}
              style={{ data: { stroke: '#c43a31' } }}
            ></VictoryBar>
          ))}
        </VictoryGroup>
      </VictoryChart>
      {/* <VictoryGroup offset={25} colorScale={['tomato', 'orange', 'gold']}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          height={200}
          width={300}
          animate={{ duration: 500 }}
        >
          <VictoryLabel
            text="Items Bought Over Time On Shopping Lists"
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
        </VictoryChart>
      </VictoryGroup> */}
    </div>
  );
};

export default VisualIngredientLineGraph;
