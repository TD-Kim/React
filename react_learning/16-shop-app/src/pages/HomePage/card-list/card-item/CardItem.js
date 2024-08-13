import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, addToCart } from '../../../../store/cart/cartSlice';

// CardItem 컴포넌트
const CardItem = ({ item }) => {
  const { products } = useSelector((state) => state.cartSlice);
  // some(): 이 메서드는 배열의 각 요소에 대해 주어진 콜백 함수를 실행하고,
  // 콜백 함수가 true를 반환하는 경우 true를 반환한다.
  // 배열의 요소 중 하나라도 조건을 만족하면 true를 반환하며,
  // 그렇지 않으면 false를 반환한다.
  const productMatching = products.some((product) => product.id === item.id);
  // findIndex는 결과가 -1인지 아닌지를 별도로 확인해야 한다.
  // 이 방법은 추가적인 비교 연산이 필요하다.
  // const productMatching =
  //   products.findIndex((product) => product.id === item.id) !== -1
  //     ? true
  //     : false;
  const dispatch = useDispatch();
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);

  const addItemToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addCartItem({ collectionName: ['users', uid, 'cart'], product: item })
      );
    } else {
      dispatch(addToCart(item));
    }
  };

  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt='product card' />
      </Link>

      <h5>{item.title.substring(0, 15)}...</h5>

      <div>
        <button
          disabled={productMatching}
          onClick={() => !productMatching && addItemToCart()}
        >
          {productMatching ? '장바구니에 담긴 제품' : '장바구니에 담기'}
        </button>
        <p>$ {item.price}</p>
      </div>
    </li>
  );
};

export default CardItem;
