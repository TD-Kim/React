import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';
import { getData } from '../api/firebase';
import { useSelector } from 'react-redux';

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // const diaryList = useContext(DiaryStateContext);
  const diaryList = useSelector((state) => state.diary.items);

  const handleLoad = async () => {
    const resultData = await getData('diary', id);
    setOriginData(resultData);
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    // handleLoad();
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
