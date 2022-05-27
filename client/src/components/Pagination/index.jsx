import React from "react";

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
               <button className="buttonPag" onClick={
                   currentPage===1?
                   pagination(currentPage)
                   :() => pagination(currentPage-1)
                   }>{'<'}</button>
               </li>
              <li className="pagination">
               <button className="pagination-button" onClick={() => pagination(currentPage)}>{currentPage}</button>
               </li>
              <li className="pagination">
               <button className="buttonPag" onClick={
                   currentPage===pageNumbers.length?
                   pagination(currentPage)
                   :() => pagination(currentPage+1)
                   }>{'>'}</button>
               </li>
       </ul>
      </nav>
    );
  }
}



