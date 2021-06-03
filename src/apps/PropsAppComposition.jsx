import React from "react";
import "./App.styles.css";
import { movieList } from "./resources";

const PropsApp = () => {
  const [movies, setMovies] = React.useState(movieList);

  const updateLikes = (id, value) => {
    const index = movies.findIndex((movie) => movie.id === id);
    const movie = movies[index];
    setMovies((movies) => {
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
      {/* <MovieBox movies={movies} like={like} dislike={dislike} /> */}
      <MovieBox>
        <MovieList movies={movies} like={like} dislike={dislike} />
      </MovieBox>
    </>
  );
};

export default PropsApp;

// ----------------------------------------------------------------

/***  NAV SECTION ***/
const Nav = ({ movies }) => {
  const topMovie = movies.reduce(
    (max, currentMovie) =>
      currentMovie.likes > max.likes ? currentMovie : max,
    movies[0]
  );

  const topLikesNumber = movies.reduce(
    (totalLikes, currentMovie) => totalLikes + currentMovie.likes,
    0
  );

  return (
    <nav>
      <TopMovie topMovieName={topMovie.name} />
      <TopLikes topLikesNumber={topLikesNumber} />
    </nav>
  );
};

const TopMovie = ({ topMovieName }) => {
  return <div className="top-movie">{topMovieName}</div>;
};

const TopLikes = ({ topLikesNumber }) => {
  return <div className="top-movie"> Total Likes : {topLikesNumber}</div>;
};

// ----------------------------------------------------------------

/***  NAV SECTION ***/

const MovieBox = ({ children }) => {
  console.log("Movie Box rerendered");
  return (
    <section className="movie-box">
      <h2>Movie Box</h2>
      {children}
    </section>
  );
};

const MovieList = ({ movies, like, dislike }) => {
  return (
    <div>
      <h3>List of Movies</h3>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieListItem
            key={movie.id}
            movie={movie}
            like={like}
            dislike={dislike}
          />
        ))}
      </div>
    </div>
  );
};

const MovieListItem = ({ movie, like, dislike }) => {
  return (
    <div className="movie-item">
      <h5>{movie.name}</h5>
      <h5>Likes : {movie.likes}</h5>
      <div>
        <button onClick={() => like(movie.id)}>
          <span role="img" aria-label="like">
            👍🏼
          </span>
        </button>
        <button onClick={() => dislike(movie.id)}>
          <span role="img" aria-label="like">
            👎🏼
          </span>
        </button>
      </div>
    </div>
  );
};
