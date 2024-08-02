import { addDatas, deleteDatas, getDatas, updateDatas } from './firebase';

// const itemsCollectionRef = collection(db, 'items');

// Action Types
const FETCH_ITEMS = 'FETCH_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_ERROR = 'SET_ERROR';

// Initial State
const initialState = {
  items: [],
  error: null,
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, error: null };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload], error: null };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
        error: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.docId !== action.payload),
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Actions
const fetchItems = async (collectionName, dispatch) => {
  try {
    const { resultData, lastQuery } = await getDatas(collectionName);
    dispatch({ type: FETCH_ITEMS, payload: resultData });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

const addItem = async (collectionName, addObj, dispatch) => {
  try {
    const resultData = await addDatas(collectionName, addObj);
    dispatch({ type: ADD_ITEM, payload: resultData });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

const updateItem = async (collectionName, docId, updateObj, dispatch) => {
  try {
    const resultData = await updateDatas(collectionName, docId, updateObj);
    dispatch({ type: UPDATE_ITEM, payload: resultData });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

const deleteItem = async (collectionName, docId, dispatch) => {
  try {
    const resultData = await deleteDatas(collectionName, docId);
    dispatch({ type: DELETE_ITEM, payload: resultData });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export { initialState, reducer, fetchItems, addItem, updateItem, deleteItem };
