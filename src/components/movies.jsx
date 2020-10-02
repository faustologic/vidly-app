import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete() {
    console.log("delete btn Clicked");
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <th>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </th>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <button
                  onClick={this.handleDelete}
                  className="btn btn-danger m-2"
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
