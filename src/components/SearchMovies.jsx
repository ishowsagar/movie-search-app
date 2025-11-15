function SearchMovies() {
  return (
    <form className="form">
      <label htmlFor="query" className="label">
        Movie Name
      </label>
      <input
        className="input"
        type="text"
        id="query"
        name="query"
        placeholder="i.e Marvel Endgame"
      />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchMovies;
