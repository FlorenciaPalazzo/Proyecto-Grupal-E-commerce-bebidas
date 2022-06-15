import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { adminDeleteProd, getProducts, resetUser } from "../../redux/actions";
import Pagination from "../Pagination";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import SearchBar from "../SearchBar";
import swal from "sweetalert";
import "./ViewProducts.css";

export default function ViewProducts() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bool, setBool] = useState(true);
  const loading = useSelector((state) => state.isLoading);
  const admin = useSelector((state) => state.isAdmin);
  const searchProduct = useSelector((state) => state.searchProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /* setProductsPerPage*/] = useState(10); //15 productos por pagina

  const indexOfLastProduct = currentPage * productsPerPage; // 15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0

  //Productos que estan en la pagina actual
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleLink(id) {
    navigate(`/admin/products/edit/${id}`);
  }

  function handleDelete(id) {
    // dispatch(adminDeleteProd(id))
    // setTimeout(()=>{
    //   dispatch(getProducts())
    // },1000)
    // console.log("Se ejecuta el handleDelete");
    swal({
      title: "¿Seguro que quieres borrar este producto?",
      //text: "Le notificaremos al usuario que infrigió las normas de la página",
      type: "warning",
      buttons: {
        cancel: "Cancelar",
        cofirm: {
          text: "Borrar producto",
          value: "confirm",
        },
      },
    })
      .then((value) => {
        if (value === "confirm") {
          dispatch(adminDeleteProd(id));
        }
        //window.location.reload();
      })
      .then(() => {
        dispatch(getProducts());
      });
  }

  useEffect(() => {
    if (bool) {
      dispatch(getProducts());
    }
    setBool(false);
    // !products.length && dispatch(getProducts());
  }, [products]);
  console.log(products);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : admin ? (
        <div>
          <AdminPanel />

          <div class="viewproducts-borde">
            {" "}
            <div>
              <SearchBar setCurrentPage={setCurrentPage} />
            </div>
            <Pagination
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              product={products.length}
              pagination={pagination}
            />
            <div className="viewproducts-cont">Usuarios</div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th> </th>
                  <th className="viewproducts-display" scope="col">
                    NOMBRE:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col-md-1">
                    MARCA:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col">
                    TIPO:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col">
                    TAMAÑO:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col">
                    GRADUACIÓN:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col">
                    STOCK:{" "}
                  </th>
                  <th className="viewproducts-display" scope="col">
                    PRECIO:{" "}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {currentProducts.map((product) => {
                  return (
                    <tr>
                      <td className="viewproducts-display">
                        <img src={product.imagen} width="50" />
                      </td>
                      <td>{product.nombre}</td>
                      <td className="viewproducts-display">{product.marca}</td>
                      <td className="viewproducts-display">
                        {product.tipo &&
                          product.tipo.charAt(0).toUpperCase() +
                            product.tipo.slice(1)}
                      </td>
                      <td className="viewproducts-display">{product.ml} ml.</td>
                      <td className="viewproducts-display">
                        {product.graduacion}%
                      </td>
                      <td>{product.stock}</td>
                      <td>${product.precio}</td>
                      <td>
                        <div className="viewusers-cont-btn">
                          <button
                            onClick={() => handleLink(product.id)}
                            className="viewproducts-btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                          <button
                            className="viewproducts-btn"
                            onClick={() => {
                              handleDelete(product.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1> No eres administrador </h1>
      )}
      <Link to="/">
        <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
          Volver al home
        </button>
      </Link>
    </div>
  );
}
