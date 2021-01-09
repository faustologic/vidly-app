import React, { Component } from "react";
import "@fortawesome/free-solid-svg-icons";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }, // We use Lodash
  };

  async componentDidMount() {
    // With this function we can put all in the DOM area
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleGenreSelect = (genre) => {
    // Filtering the genre movies
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  handleLike = (movie) => {
    // method to add or remove a like icon button
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    // deleting any item that we want
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalMovies });
    }
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
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPagedRender();
    // if (count === 0) return <p>There are no movies on the Database</p>;

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
          {user && (
            <Link to="/movies/new">
              <button className="btn btn-primary btn-sm mb-2">New Movie</button>
            </Link>
          )}
          <p>Showing {totalCount} movies in the Database</p>
          <SearchBox onChange={this.handleSearch} value={searchQuery} />
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
