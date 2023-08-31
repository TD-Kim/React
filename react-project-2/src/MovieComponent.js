import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./components/Movie";

class MovieComponent extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ isLoading: false });
  //   }, 3000);
  // }
  getMoives = async () => {
    console.log("test");
    // async는 javascript에게 compenentDisMount 함수가 끌날 때까지 약간 시간이 걸릴 수 있다는 것을 알려주는것.
    // async 는 비동기라는것을 알려줌. 그리고 함수내부에서는 뭘 기다리길 원하는지를 표시하기위해 await 을 사용한다.
    // npm install axios 입력해서 설치 먼저 해야함
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    // console.log(movies);
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMoives();
  }
  render() {
    const { isLoading, movies } = this.state;
    // return <div>{this.state.isLoading ? "Loading..." : "We are ready"}</div>;
    return (
      <div>
        {isLoading
          ? "Loading..."
          : movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />
            ))}
      </div>
    );
  }
}

export default MovieComponent;
