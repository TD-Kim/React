import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h2>잘못된 경로로 접근하셨습니다.</h2>
      <p>
        <Link to="/">Home 으로 이동하기</Link>
      </p>
    </div>
  );
};

export default NoMatch;
