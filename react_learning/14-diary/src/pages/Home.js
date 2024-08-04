import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems as fetchItems2 } from '../diarySlice';

const Home = () => {
  // const diaryList = useContext(DiaryStateContext);
  const dispatch2 = useDispatch();
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  const diaryList = useSelector((state) => {
    return state.diary.items;
  });
  useEffect(() => {
    dispatch2(fetchItems2('diary'));
    // fetchItems('diary', dispatch);
  }, []);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList?.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    } else {
      setData([]);
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
