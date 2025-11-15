import { useReducer } from "react";
function SearchMovies() {
  // ! All states management
  const [state, dispatch] = useReducer(
    (state, action) => {
      // todo - update state by whatever is being called down the  components
      switch (action.type) {
        case "UPDATE_INPUT": {
          return { ...state, query: action.value };
        }
        case "UPDATE_MOVIE": {
          return { ...state, movie: action.movie };
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
    }
  );

  // ! fetching states and store them as destructured props
  const { query, movie } = state;

  const searchMovieFn = async (e) => {
    e.preventDefault();
    console.log("searching for:", query);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=bfe696c235c63da555786ee616cbdf1d&language=en-US&query=${query}&page=1&include_adult=false`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "UPDATE_MOVIE", movie: data.results });
      }
      if (!response.ok) {
        throw new Error();
      }
      //   console.log(data)
    } catch (err) {
      console.error("caught error fetching :", err);
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
      <div className="card-list">
        {movie
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div className="card" key={movie.id}>
              <img
                className="card--image"
                alt={`${movie.title}`}
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              />
              <div className="card-content">
                <h3 className="card--title">{movie.title}</h3>
                <p>
                  <small>RELEASE DATE : {movie.release_date}</small>
                </p>
                <p>
                  <small>RATING : {movie.vote_average}</small>
                </p>
                <p className="card--title">{movie.overview}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default SearchMovies;
