import React, { useEffect } from 'react'
import { VictoryBar, VictoryChart } from 'victory'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPantries } from '../store/pantries'
import { captureRejections } from 'pg/lib/query'

const Visuals = () => {
  const { username, id } = useSelector(state => state.auth)
  const { pantries } = useSelector(state => state)
  const dispatch = useDispatch()

  const obj = {
    { item: 'carrot', pantryQty: 3 }
  }

  const data = pantries.map(pantry => {
    const ingredient = pantry.ingredients

    // const { pantryQty }

  })

  console.log('ingredients: ', pantries)

  useEffect(() => {
    dispatch(fetchAllPantries(id))
  }, []);

  return (
    <VictoryChart>
    <VictoryBar

      />
    </VictoryChart>
  )
  }

export default Visuals;
