import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/actions";

export default function ViewProducts() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function handleLink(id){
    navigate(`/admin/products/edit/${id}`)
  }
  useEffect(() => {
    !products.length && dispatch(getProducts());
  }, [products]);
  return (
    <div class="container">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3 class="box-title mt-5">Tabla de Productos: </h3>
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
              {products.map((product) => {
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
                    <td><button onClick={() => handleLink(product.id)}>Editar</button></td>
                  </tr>
                        
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
