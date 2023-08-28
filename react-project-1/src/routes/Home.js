import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMoives = async () => {
    // 1.
    // const response = await fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
    // );
    // const json = await response.json();
    // 2.
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  // 요즘은 then 보다는 async-await 을 더 많이 사용함
  // useEffect(() => {
  //   fetch(
  //     `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMovies(json.data.movies);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    getMoives();
  }, []);
  //   console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {/* key는 React.js 에서만 map 안에서 component들을 render할 때 사용하는 것 */}
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

// <div>
//   {loading ? (
//     <h1>Loading...</h1>
//   ) : (
//     <div>
//       {movies.map((movie) => (
//         <div key={movie.id}>
//           <img src={movie.medium_cover_image} />
//           <h2>{movie.title}</h2>
//           <p>{movie.summary}</p>
//           <ul>
//             <li>
//               {movie.genres.map((g) => (
//                 <li key={g}>{g}</li>
//               ))}
//             </li>
//           </ul>
//         </div>
//       ))}
//     </div>
//   )}
// </div>
