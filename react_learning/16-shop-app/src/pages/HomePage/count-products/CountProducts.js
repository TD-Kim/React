import React from 'react';
import styles from './CountProducts.module.scss';
import { useSelector } from 'react-redux';

const CountProducts = () => {
  const { products, isLoading } = useSelector((state) => state.productsSlice);

  return (
    <div className={styles.count_products}>
      {!isLoading && <p>Showing: {products.length} items</p>}
    </div>
  );
};

export default CountProducts;
