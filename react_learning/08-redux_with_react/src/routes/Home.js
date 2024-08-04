import { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators, add } from '../store';
import ToDo from '../components/ToDo';

function Home({ toDos, addToDo }) {
  //   console.log(props);
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addToDo(text);
    setText('');
  };
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      {/* <ul>{JSON.stringify(toDos)}</ul> */}
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// store로 부터 state 를 가져다주는 용도의 함수이다.
// function getCurrentState(state, ownProps) {};
function mapStateToProps(state, ownProps) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatch 에서 actionCrreators 를 호출
    // 함수를 만드는것.
    // addToDo: (text) => dispatch(actionCreators.addToDo(text)),
    addToDo: (text) => dispatch(add(text)),
  };
}

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home); // connect 함수는
// export default connect(null, mapDispatchToProps)(Home); // props 를 전달할 필요가 없으면 connect 함수의 첫번째 파라미터를 null 을 넣어주면 된다.
