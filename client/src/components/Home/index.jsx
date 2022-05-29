import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBrands,
  getProducts,
} from "../../redux/actions";

import NavBar from "../NavBar";
import Card from "../Card";
import Pagination from "../Pagination";
import Loading from "../Loading";
import "./HomeStyles.css"
function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const loading = useSelector((state) => state.isLoading);

  const [, /*order*/ setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /*setProductsPerPage*/] = useState(16); //15 productos por pagina

  const indexOfLastProduct = currentPage * productsPerPage; // 15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  //Productos que estan en la pagina actual
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    /* console.log(product);
    console.log("effect"); */

    if (product.length === 0) {
      dispatch(getProducts());
    }
    dispatch(getBrands());
  }, [dispatch, product, loading]);

  return (
    <div>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="div-body">
          <NavBar />
          <div>
            <Pagination
            currentPage = {currentPage}
              productsPerPage={productsPerPage}
              product={product.length}
              pagination={pagination}
            />
            <div className="card-container">
              {currentProducts.length > 0 ? (
                currentProducts.map((e) => {
                  return (
                    <div key={e.id} className="div-key-card">
                      <Link to={"/bebida/" + e.id}>
                        <Card
                          nombre={e.nombre}
                          imagen={e.imagen}
                          id={e.id}
                          marca={e.marca}
                          ml={e.ml}
                          graduacion={e.graduacion}
                          precio={e.precio}
                        />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h1 className="error">No products were found</h1>
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
}
export default Home;
