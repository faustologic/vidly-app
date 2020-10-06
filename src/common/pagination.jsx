import React from "react";
import _ from "lodash";

// We install lodash to make easy the iterarion of an array

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;

  // We make this operation to hide the 1 page when the number of movies occupies just one page.
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  // We have to include the +1 to add the last number of the array
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
