import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "@fortawesome/free-solid-svg-icons";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }, // We use Lodash
  };

  componentDidMount() {
    // With this function we can put all in the DOM area
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenreSelect = (genre) => {
    // Filtering the genre movies
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleLike = (movie) => {
    // method to add or remove a like icon button
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    // deleting any item that we want
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // handeling the number of pages and change it
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    // sorting the columns, using ascending or descending order.
    this.setState({ sortColumn });
  };

  getPagedRender = () => {
    // Extracting this method, we can define all the methods for pagination in just one main method
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPagedRender();
    if (count === 0) return <p>There are no movies on the Database</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            // less is more.
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the Database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount} // Inputs
            pageSize={pageSize} // Inputs
            currentPage={currentPage} // Input
            onPageChange={this.handlePageChange} // Methods
          />
        </div>
      </div>
    );
  }
}

export default Movies;
