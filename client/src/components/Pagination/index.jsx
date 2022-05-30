import React from "react";
import "./PagStyles.css";

export default class Pagination extends React.Component {
  render() {
    const { product, productsPerPage, pagination, currentPage } = this.props;
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(product / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    //Este componente va a renderizar los numeritos en si
    return (
      <nav>
        <ul className="ul">
          <li className="pagination">
            {currentPage !== 1 ? (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage - 1)}
              >
                {" "}
                {"<"}
              </button>
            ) : null}
          </li>
          <li className="pagination">
            <button
              className="pagination-number"
              onClick={() => pagination(currentPage)}
            >
              {currentPage}
            </button>
          </li>
          <li className="pagination">
            {currentPage > pageNumbers.length - 1 ? null : (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage + 1)}
              >
                {">"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}
