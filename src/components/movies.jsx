import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "@fortawesome/free-solid-svg-icons";
import Like from "../common/like";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  onPageChange = (page) => {
    console.log(page);
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies on the Database</p>;

    return (
      <React.Fragment>
        <p>Showing {count} movies in the Database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count} // Inputs
          pageSize={this.state.pageSize} // Inputs
          onPageChange={this.onPageChange} // Methods
        />
      </React.Fragment>
    );
  }
}

export default Movies;
