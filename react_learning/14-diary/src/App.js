import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import { getDatas } from './api/firebase';
import {
  addItem,
  deleteItem,
  fetchItems,
  initialState,
  reducer,
  updateItem,
} from './api/itemReducer';

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

  const handleLoad = async () => {
    dispatch({ type: 'INIT', data: await getDatas('diary') });
  };

  useEffect(() => {
    // const localData = localStorage.getItem("diary");
    // if (localData) {
    //   const diaryList = JSON.parse(localData).sort(
    //     (a, b) => parseInt(b.id) - parseInt(a.id)
    //   );

    //   if (diaryList.length >= 1) {
    //     dataId.current = parseInt(diaryList[0].id) + 1;
    //     dispatch({ type: "INIT", data: diaryList });
    //   }
    // }
    // handleLoad();
    fetchItems('diary', dispatch);
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
    await addItem('diary', addObj, dispatch);
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = async (docId) => {
    await deleteItem('diary', docId, dispatch);
  };
  // EDIT
  const onEdit = async (values, docId) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItem('diary', docId, updateObj, dispatch);
  };

  return (
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className='App'>
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
    </DiaryStateContext.Provider>
  );
}

export default App;
