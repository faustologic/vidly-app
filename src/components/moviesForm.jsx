import React from "react";

const MoviesForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movies Forms</h1>
      <h5>{match.params.id}</h5>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
