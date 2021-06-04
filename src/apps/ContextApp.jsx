import React from "react";
import "./App.styles.css";
import { movieList } from "./resources";

/** Creating context for the state and useState for optimization **/
const MovieStateContext = React.createContext();
const MovieUseStateContext = React.createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = React.useState(movieList);
  return (
    <MovieStateContext.Provider value={movies}>
      <MovieUseStateContext.Provider value={setMovies}>
        {children}
      </MovieUseStateContext.Provider>
    </MovieStateContext.Provider>
  );
};

function useMovieState() {
  const context = React.useContext(MovieStateContext);
  if (context === undefined) {
    throw new Error(
      "useMovieState must be called inside MovieContext Provider"
    );
  }
  return context;
}

function useMovieUpdate() {
  const context = React.useContext(MovieUseStateContext);
  if (context === undefined) {
    throw new Error(
      "useMovieUpdate must be called inside MovieContext Provider"
    );
  }
  return context;
}

const ContextApp = () => {
  return (
    <MovieProvider>
      <Nav />
      <MovieBox>
        <MovieList />
      </MovieBox>
    </MovieProvider>
  );
};

export default ContextApp;

// ----------------------------------------------------------------

/***  NAV SECTION ***/
const Nav = () => {
  const movies = useMovieState();
  const topMovie = movies.reduce(
    (max, currentMovie) =>
      currentMovie.likes > max.likes ? currentMovie : max,
    movies[0]
  );

  const totalLikes = movies.reduce(
    (likes, currentMovie) => likes + currentMovie.likes,
    0
  );

  return (
    <nav>
      <TopMovie topMovieName={topMovie.name} />
      <TotalLikes totalLikes={totalLikes} />
    </nav>
  );
};

const TopMovie = React.memo(({ topMovieName }) => {
  return <div className="top-movie">{topMovieName}</div>;
});

const TotalLikes = ({ totalLikes }) => {
  return <div className="top-movie">{totalLikes}</div>;
};

// ----------------------------------------------------------------

/***  BODY SECTION ***/
const MovieBox = ({ children }) => {
  console.log("Movie Box rerender");
  return (
    <section className="movie-box">
      <h2>Movie Box</h2>
      {children}
    </section>
  );
};

const MovieList = () => {
  const movies = useMovieState();
  return (
    <>
      <h3>List of Movies</h3>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieListItem movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

const MovieListItem = ({ movie }) => {
  const setLikes = useMovieUpdate();
  const updateLikes = (id, value) => {
    setLikes((movies) => {
      movies[id].likes += value;
      return [...movies];
    });
  };

  const like = (id) => updateLikes(id, 1);
  const dislike = (id) => updateLikes(id, -1);

  return (
    <div className="movie-item">
      <h5>{movie.name}</h5>
      <h5>Likes : {movie.likes} </h5>
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
