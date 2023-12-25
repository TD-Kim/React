import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// function Detail({toDos}) {
function Detail({ toDos }) {
  const { id } = useParams();
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id));
  console.log(id);
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at: {toDo?.id}</h5>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  //   const {
  //     match: {
  //       params: { id },
  //     },
  //   } = ownProps;

  //   return { toDos: state.find((toDo) => toDo.id === id) }; // find 는 filter 와 비슷하지만 조건을 만족하는 첫번째 요소만 반환한다.
  return { toDos: state };
}

export default connect(mapStateToProps)(Detail);
