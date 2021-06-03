import React from "react";
import "./App.styles.css";
import { movieList } from "./resources";

const PropsApp = () => {
  const [movies, setMovies] = React.useState(movieList);
  const updateLikes = (id, value) => {
    setMovies((movies) => {
      const index = movies.findIndex((movie) => movie.id === id);
      const movie = movies[index];
      return [
        ...movies.slice(0, index),
        { ...movie, likes: movie.likes + value },
        ...movies.slice(index + 1),
      ];
    });
  };

  const like = (id) => updateLikes(id, 1);
  const dislike = (id) => updateLikes(id, -1);

  return (
    <>
      <Nav movies={movies} />
      <Body movies={movies} like={like} dislike={dislike} />
    </>
  );
};

export default PropsApp;

const Nav = ({ movies }) => {
  const topMovieName = movies.reduce(
    (max, current) => (current.likes > max.likes ? current : max),
    movies[0]
  ).name;
  const totalLikes = movies.reduce(
    (accumulator, movie) => accumulator + movie.likes,
    0
  );

  return (
    <div className="nav">
      <TopMovie topMovieName={topMovieName} />
      <TotalLikes totalLikes={totalLikes} />
    </div>
  );
};

const TopMovie = ({ topMovieName }) => <div>{topMovieName}</div>;

const TotalLikes = ({ totalLikes }) => <div>Total Likes: {totalLikes}</div>;

const Body = ({ movies, like, dislike }) => (
  <div className="body">
    <Movies movies={movies} like={like} dislike={dislike} />
  </div>
);

const Movies = ({ movies, like, dislike }) => {
  const [movieIds] = React.useState(movieList.map((movie) => movie.id));

  return (
    <div>
      <h2>Movies</h2>
      <div className="movie-list">
        {movieIds.map((id) => (
          <Movie key={id} movie={movies[id]} like={like} dislike={dislike} />
        ))}
      </div>
    </div>
  );
};

const Movie = ({ movie, like, dislike }) => (
  <div className="movie-item">
    <div>{movie.name}</div>
    <div>{movie.likes}</div>
    <div>
      <button onClick={() => like(movie.id)}>
        <span role="img" aria-label="like">
          👍🏼
        </span>
      </button>
      <button onClick={() => dislike(movie.id)}>
        <span role="img" aria-label="dislike">
          👎🏼
        </span>
      </button>
    </div>
  </div>
);
