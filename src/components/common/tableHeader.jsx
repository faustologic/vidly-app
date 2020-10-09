import React, { Component } from "react";

// Interface Props
// column: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = (path) => {
    // ascending and descending function for sorting data
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { column } = this.props;
    return (
      <thead>
        <tr>
          {column.map((column) => (
            <th
              // Column array object is on the MoviesTables component.
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
