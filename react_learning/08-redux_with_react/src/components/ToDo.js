import { connect } from 'react-redux';
import { actionCreators, remove } from '../store';
import { Link } from 'react-router-dom';

function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps);
  return {
    // onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
    onBtnClick: () => dispatch(remove(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
