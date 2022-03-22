import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllShoppingLists } from '../store/ShoppingList';

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllShoppingLists(id));
  }, []);

  console.log(shoppingList)

  return (
  <div>

  </div>
  );
};

export default ShoppingList;
