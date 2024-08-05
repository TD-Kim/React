import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import {
  addItem,
  deleteItem,
  fetchItems,
  initialState,
  reducer,
  updateItem,
} from './api/itemReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems as fetchItems2,
  addItem as addItem2,
  updateItem as updateItem2,
  deleteItem as deleteItem2,
} from './diarySlice';
import customSelector from './hooks/customSelector';
import MyButton from './components/MyButton';

// const reducer = (state, action) => {
//   // console.log(state);
//   // console.log(action);
//   let newState = [];
//   switch (action.type) {
//     case 'INIT': {
//       // return action.data;
//       return action.data;
//     }
//     case 'CREATE': {
//       newState = [action.data, ...state];
//       break;
//     }
//     case 'REMOVE': {
//       newState = state.filter((it) => it.id !== action.targetId);
//       break;
//     }
//     case 'EDIT': {
//       newState = state.map((it) =>
//         it.id === action.data.id ? { ...action.data } : it
//       );
//       break;
//     }
//     default:
//       return state;
//   }

//   localStorage.setItem('diary', JSON.stringify(newState));
//   return newState;
// };

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const status = useSelector((state) => state.diary.status);
  const dispatch2 = useDispatch();
  const items = useSelector((state) => {
    return state.diary.items;
  });

  useEffect(() => {
    dispatch2(fetchItems2('diary'));
    // fetchItems('diary', dispatch);
  }, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: 'kjy.devops@gmail.com',
    };
    // await addItem('diary', addObj, dispatch);
    dispatch2(addItem2({ collectionName: 'diary', addObj }));
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = async (docId) => {
    dispatch2(deleteItem2({ collectionName: 'diary', docId }));
  };
  // EDIT
  const onEdit = async (values, docId) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    dispatch2(updateItem2({ collectionName: 'diary', docId, updateObj }));
  };

  return (
    // <DiaryStateContext.Provider value={items}>
    <DiaryDispatchContext.Provider
      value={{
        onCreate,
        onEdit,
        onRemove,
      }}
    >
      <BrowserRouter>
        <div className='App'>
          <MyButton text={'로그인'} />
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='new' element={<New />} />
              <Route path='edit/:id' element={<Edit />} />
              <Route path='diary/:id' element={<Diary />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DiaryDispatchContext.Provider>
    // </DiaryStateContext.Provider>
  );
}

export default App;
