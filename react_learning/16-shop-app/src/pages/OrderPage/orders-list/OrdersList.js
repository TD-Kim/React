import React, { useEffect } from 'react';
import CartEmpty from '../../../components/cart-empty/CartEmpty';
import { useAuth } from '../../../hooks/useAuth';
import OrderItem from './order-item/OrderItem';
import styles from './OrdersList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../../store/order/orderSlice';
import { getISODate } from '../../../utils/getFormattedDate';

const OrdersList = () => {
  const { id } = useAuth();
  const { order } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchOrder({ collectionPath: ['users', id, 'orders'], queryOptions: {} })
    );
  }, [id]);

  if (!order.length) {
    return <CartEmpty title='주문 내역' />;
  }

  return (
    <div className={styles.orders}>
      {order.map((item) => (
        <div key={item.id}>
          <div className={styles.order_header}>
            <h3>주문 번호_{item.createdAt}</h3>
            <h3>
              주문 날짜_{getISODate(item.createdAt).yyyyMMdd}{' '}
              {getISODate(item.createdAt).HHmmss}
            </h3>
            <p>합계: $ {item.totalPrice.toFixed(2)}</p>
          </div>

          <ul className={styles.orders_list}>
            {item.products.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
