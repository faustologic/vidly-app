/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types"; // Verification with Proptypes
import _ from "lodash";

// We install lodash to make easy the iterarion of an array

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  // We make this operation to hide the 1 page when the number of movies occupies just one page.
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  // We have to include the +1 to add the last number of the array
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// We use the PropTypes props verification, to asure that we can avoid any error on the history of the app web
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
