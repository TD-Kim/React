import React, { useEffect } from 'react';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import CardItem from './card-item/CardItem';
import styles from './CardList.module.scss';
import { fetchProducts } from '../../../store/producs/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDatasRest } from '../../../restAPI';
const CardList = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productsSlice);
  const category = useSelector((state) => state.categoriesSlice);

  const handleLoad = async (queryOptions) => {
    const result = await getDatasRest('products', queryOptions);
    console.log(result);
  };

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: 'category',
          operator: category ? '==' : '>=',
          value: category.toLowerCase(),
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: 'products', queryOptions }));
    handleLoad(queryOptions);
  }, [category]);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      {products.map((product) => (
        <CardItem key={product.id} item={product} />
      ))}
    </ul>
  );
};

export default CardList;
