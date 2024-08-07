import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavCartItem.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../../../../store/cart/cartSlice';

// NavCartItem 컴포넌트
const NavCartItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(deleteFromCart(item.id));
  };

  return (
    <div className={styles.nav_cart_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt='product card' />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{item.category}</h3>
        <h2>{item.title}</h2>
        <span>
          {item.price} x {item.quantity} = $ {item.total.toFixed(2)}
        </span>
      </div>
      <button onClick={deleteProduct} className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default NavCartItem;
