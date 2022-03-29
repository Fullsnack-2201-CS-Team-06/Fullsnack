import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VictoryBar } from 'victory'
import { fetchAllPantries } from '../store/pantries'
import Visuals from './Visuals'
import Visual2 from './Visual2'

/**
 * COMPONENT
 */
const Home = props => {
  const { username, id } = useSelector(state => state.auth)

  const { pantries } = useSelector(state => state.pantries)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPantries(id))
  }, []);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Visuals />
      <Visual2 />
    </div>
  )
}

export default Home
