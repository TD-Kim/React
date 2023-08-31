import React from "react";
import PropTypes from "prop-types";

class ComponentLifeCycle extends React.Component {
  // constructor 는 Javascript 에서 class를 만들 때 호출되는 것.
  constructor(props) {
    super(props);
    console.log("hello"); // 이렇게만하면 오류가 찍히는데 super 가 없어서 그런것.
  }
  state = {
    count: 0,
  };
  add = () => {
    this.setState((current) => ({ count: current.count + 1 }));
  };
  minus = () => {
    this.setState((current) => ({ count: this.state.count - 1 }));
  };
  componentDidMount() {
    console.log("component renderd");
  }
  componentDidUpdate() {
    console.log("I just updated");
  }
  componentWillUnmount() {
    console.log("Goodbye, cruel world");
  }
  // shouldComponentUpdate() {
  //   // compenent 를 update 할 지 묻는 함수
  //   alert("Are you sure?");
  //   return true;
  // }

  render() {
    console.log("I'm rendering");
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}

export default ComponentLifeCycle;
