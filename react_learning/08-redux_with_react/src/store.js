import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

// store.subscribe(); // 변경사항을 우리에게 알려줌. 변화가 일어나면 우리의 어플리케이션을 리렌더링 하고 싶으니. 이때 필요한게 react-redux 이다.

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
