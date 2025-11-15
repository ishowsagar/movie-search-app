import { useReducer } from "react";
import MovieCard from "./MovieCard";
function SearchMovies() {
  // ! All states management
  const [state, dispatch] = useReducer(
    (state, action) => {
      // todo - update state by whatever is being called down the  components
      switch (action.type) {
        case "UPDATE_INPUT": {
          return { ...state, query: action.value };
        }
        case "SET_LOADING": {
          return { ...state, isLoading: true };
        }
        case "UPDATE_MOVIE": {
          return {
            ...state,
            movie: action.movie,
            hasLoaded: true,
            isLoading: false,
          };
        }
        case "UPDATE_MOVIE_ERROR": {
          return { ...state, hasLoaded: false, isLoading: false };
        }
        default: {
          return state;
        }
      }
    },
    {
      // todo - set initial states as in state properties
      // all state variables properties --> defined here
      query: "",
      movie: [],
      hasLoaded: null,
      isLoading: false,
    }
  );

  // ! fetching states and store them as destructured props
  const { query, movie, hasLoaded, isLoading } = state;

  const searchMovieFn = async (e) => {
    e.preventDefault();
    console.log("searching for:", query);
    dispatch({ type: "SET_LOADING" });
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=bfe696c235c63da555786ee616cbdf1d&language=en-US&query=${query}&page=1&include_adult=false`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      dispatch({ type: "UPDATE_MOVIE", movie: data.results });
    } catch (err) {
      console.error("caught error fetching :", err);
      dispatch({ type: "UPDATE_MOVIE_ERROR" });
    }
  };
  return (
    // when form is submitted --> run this function to fetch data from api
    <>
      <form className="form" onSubmit={searchMovieFn}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          id="query"
          value={query}
          onChange={(event) => {
            dispatch({ type: "UPDATE_INPUT", value: event.target.value });
          }}
          name="query"
          placeholder="i.e Marvel Endgame"
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <h2>Loading movies... 🎬</h2>
        </div>
      ) : hasLoaded === true ? (
        <MovieCard movie={movie} />
      ) : hasLoaded === false ? (
        <div className="error-loading-movie">
          <h1>Unexpected error Caught while Searching movie! </h1>
          <p className="warning-text">bhai vpn lagake krona try again! 😭✅</p>
        </div>
      ) : null}
    </>
  );
}

export default SearchMovies;
