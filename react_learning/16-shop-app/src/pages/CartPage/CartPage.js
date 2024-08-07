import React from 'react';
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import Checkout from './checkout/Checkout';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className='page'>
      {!products.length ? (
        <CartEmpty title='Cart' />
      ) : (
        <div className='container'>
          <h1>장바구니</h1>
          <CartList />
          <Checkout />
        </div>
      )}
    </div>
  );
};

export default CartPage;
