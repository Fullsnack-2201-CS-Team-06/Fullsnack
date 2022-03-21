import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
const dispatch = useDispatch();

const Food = () => {
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

  return <div></div>;
};

export default Food;
