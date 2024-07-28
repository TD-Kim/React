import { useState } from 'react';

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const updateState = (action) => {
    return setState((state) => reducer(state, action));
  };

  const dispatch = (action) => {
    console.log(action);
    return action instanceof Promise
      ? action.then(updateState)
      : updateState(action);
  };

  return [state, dispatch];
}

export default useReducer;
