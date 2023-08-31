import React from "react";
import PropTypes from "prop-types";

class State extends React.Component {
  // class component 는 return 을 가지지 않는다.
  // class component 라고 이야기하는 이유는 state 라는 녀석때문
  // state 는 object 이며 data 를 넣을 공간이 있고 그 데이터는 변한다.
  state = {
    count: 0,
  };
  // state 를 이렇게 쓰는건 추 후에 성능문제가 될 수 있다.
  add = () => {
    // console.log("add");
    // this.state.count = 1; 이렇게 직접하면 state 가 변한건지 감지가 안됨.
    // 그래서 react 가 render function 을 refresh 하지 않기 때문에 화면에 표시가 안됨.
    // setState function 을 호출하면 react가 알아서 view를 refresh 해준다. ==> render function 을 다시 실행한다.
    this.setState((current) => ({ count: current.count + 1 }));
  };
  minus = () => {
    // console.log("minus");
    // this.state.count = -1;
    this.setState((current) => ({ count: this.state.count - 1 }));
  };
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        {/* class 이기 때문에 this.state.count 라고 써야한다. 그냥 state 는 불가 */}
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
        {/* add와 minus 뒤에 ()를 붙이면 즉시 실행되지만 클릭했을 때 작동하지 않는다. */}
      </div>
    );
  }
}

export default State;
