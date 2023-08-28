import PropTypes from "prop-types";
// 어떤 props를 가지고 있는지 알면 좋을 것 같아서 위처럼 propTypes import
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genres }) {
  // 2.
  // function Movie(props) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
