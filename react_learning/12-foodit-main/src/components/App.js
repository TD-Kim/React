import { useEffect, useState } from 'react';
import {
  getDatasByOrderLimit,
  deleteDatas,
  addDatas,
  updateDatas,
} from '../firebase';
import FoodList from './FoodList';
import FoodForm from './FoodForm';
import LocaleSelect from './LocaleSelect';
import useTranslate from '../hooks/useTranslate';
import logoImg from '../assets/logo.png';
import searchImg from '../assets/ic-search.png';
import logoTextImg from '../assets/logo-text.png';
import backgroundImg from '../assets/background.png';
import './App.css';

function AppSortButton({ selected, children, onClick }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const LIMITS = 5;

function App() {
  const t = useTranslate();
  const [order, setOrder] = useState('createdAt');
  const [lq, setLq] = useState(null);
  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState('');

  const handleNewestClick = () => setOrder('createdAt');

  const handleCalorieClick = () => setOrder('calorie');

  const handleDelete = async (docId, imgUrl) => {
    // items 에서 docId 를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas('food', docId, imgUrl);
    if (!result) {
      alert(message);
      return;
    }
    // 삭제 성공시 화면에 그 결과를 반영한다.
    setItems((prevItems) =>
      prevItems.filter(function (item) {
        return item.docId !== docId;
      })
    );
  };

  const handleLoad = async (options) => {
    let result;
    let lq;
    try {
      setLoadingError(null);
      setIsLoading(true);
      const { resultData, lastQuery } = await getDatasByOrderLimit(
        'food',
        options
      );
      result = resultData;
      lq = lastQuery;
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    if (!options.lq) {
      setItems(result);
    } else {
      setItems((prevItems) => [...prevItems, ...result]);
    }
    setLq(lq);
    if (!lq) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }
  };

  const handleLoadMore = () => {
    handleLoad({
      fieldName: order,
      lq: lq,
      limits: LIMITS,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleLoad({
      fieldName: order,
      lq: undefined,
      limits: LIMITS,
      search: search,
    });
    // setSearch(e.target['search'].value);
  };

  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    handleLoad({
      fieldName: order,
      lq: undefined,
      limits: LIMITS,
      search: search,
    });
  }, [order]);

  // useEffect(() => {
  //   if(!search) return;

  // }, [search])

  return (
    <div className='App' style={{ backgroundImage: `url("${backgroundImg}")` }}>
      <div className='App-nav'>
        <img src={logoImg} alt='Foodit' />
      </div>
      <div className='App-container'>
        <div className='App-FoodForm'>
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleCreateSuccess} />
        </div>
        <div className='App-filter'>
          <form className='App-search' onSubmit={handleSearchSubmit}>
            <input
              className='App-search-input'
              name='search'
              onChange={handleSearchChange}
            />
            <button className='App-search-button' type='submit'>
              <img src={searchImg} alt='검색' />
            </button>
          </form>
          <div className='App-orders'>
            <AppSortButton
              selected={order === 'createdAt'}
              onClick={handleNewestClick}
            >
              {t('newest')}
            </AppSortButton>
            <AppSortButton
              selected={order === 'calorie'}
              onClick={handleCalorieClick}
            >
              {t('sort by calorie')}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          className='App-FoodList'
          items={items}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
          onDelete={handleDelete}
        />
        {hasNext && (
          <button
            className='App-load-more-button'
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            {t('load more')}
          </button>
        )}
        {loadingError && <p>{loadingError.message}</p>}
      </div>
      <div className='App-footer'>
        <div className='App-footer-container'>
          <img src={logoTextImg} alt='Foodit' />
          <LocaleSelect />
          <div className='App-footer-menu'>
            {t('terms of service')} | {t('privacy policy')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
