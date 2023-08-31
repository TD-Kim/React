import React from "react";

class Detail extends React.Component {
  componentDidMount() {
    console.log(this.props); // props의 history가 있는데 go, goBack, goFoward 이것들이 url 을 변경한다. ==> 웹사이트가 어디있는지 장소를 바꿀 수 있다는말.
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }
  render() {
    const { location } = this.props;
    if (location.state) {
      return <span>{location.state.title}</span>;
    } else {
      return null;
    }
  }
}

export default Detail;
