import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Checkout.module.scss';
import { getTotalPrice, postOrder } from '../../../store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
  const { products, totalPrice } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products]);

  const { isAuth, uid } = useAuth();

  const sendOrder = () => {
    const orderObj = {
      totalPrice,
      products,
    };
    dispatch(postOrder({ uid: uid, cart: orderObj }));
  };

  return (
    <div className={styles.checkout}>
      <div>
        <p>
          {' '}
          <span>합계:</span> $ {totalPrice.toFixed(2)}
        </p>

        {isAuth ? (
          <button
            className={styles.checkout_button}
            onClick={() => sendOrder()}
          >
            계산하기
          </button>
        ) : (
          <Link className={styles.checkout_button} to='/login'>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Checkout;
