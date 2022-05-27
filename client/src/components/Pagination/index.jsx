import React from "react";

export default class Pagination extends React.Component{

    render() {
        const {product, productsPerPage, pagination} = this.props;
        const pageNumbers = [];

        for (let i = 0; i < Math.ceil(product / productsPerPage); i++) {
            pageNumbers.push(i + 1);
        }
        //Este componente va a renderizar los numeritos en si
    return (
        <nav>
          <ul className="ul">
            {pageNumbers?.map((number) => (
              <li className="pagination" key={number}>
                <button className="pagination-button"
                  onClick={() => pagination(number)}>{number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );
    }
}

// Cambiar luego para tener 3 botones únicamente para desplazarnos entre páginas (Atrás, Actual, Siguiente)

//<ul className="ul">
//               <li className="paginado">
//               <button className="buttonPag" onClick={
//                   actualPage===1?
//                   paginado(actualPage)
//                   :() => paginado(actualPage-1)
//                   }>{'<'}</button>
//               </li>
//               <li className="paginado">
//               <button className="buttonPag" onClick={() => paginado(actualPage)}>{actualPage}</button>
//               </li>
//               <li className="paginado">
//               <button className="buttonPag" onClick={
//                   actualPage===pageNumbers.length?
//                   paginado(actualPage)
//                   :() => paginado(actualPage+1)
//                   }>{'>'}</button>
//               </li>
//       </ul>