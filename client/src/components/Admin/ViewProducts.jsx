import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import Pagination from "../Pagination";

export default function ViewProducts() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /*setProductsPerPage*/] = useState(10); //15 productos por pagina

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
  useEffect(() => {
    !products.length && dispatch(getProducts());
  }, [products]);
  return (
    <div>
      <AdminPanel />
      <div class="container">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h3 class="box-title mt-5">Tabla de Productos: </h3>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        product={products.length}
        pagination={pagination}
      />
          <div class="table-responsive">
            <table class="table table-striped ">
              <thead class="thead-dark">
                <tr>
                  <th width="300">IMAGEN: </th>
                  <th width="300">NOMBRE: </th>
                  <th width="100">MARCA: </th>
                  <th>TIPO: </th>
                  <th>TAMAÑO: </th>
                  <th>GRADUACIÓN: </th>
                  <th>STOCK: </th>
                  <th>PRECIO: </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => {
                  return (
                    <tr>
                      <td>
                        <img src={product.imagen} width="150" />
                      </td>
                      <td>{product.nombre}</td>
                      <td>{product.marca}</td>
                      <td>
                        {product.tipo.charAt(0).toUpperCase() +
                          product.tipo.slice(1)}
                      </td>
                      <td>{product.ml} ml.</td>
                      <td>{product.graduacion}%</td>
                      <td>{product.stock}</td>
                      <td>${product.precio}</td>
                      <td>
                        <button onClick={() => handleLink(product.id)}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
