import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats, getTopProds } from "../../redux/actions";

export default function ProductsStats() {
  const stats = useSelector((state) => state.stats);
  const products = useSelector((state) => state.topProds);
  const [bool, setBool] = useState(true);
  const [top, setTop] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (bool) {
      dispatch(getStats());
      console.log("traje las stats");
    }
    if (stats.comprasCount && bool) {
      setTop(Object.entries(stats.comprasCount));
      dispatch(getTopProds(Object.entries(stats.comprasCount)));
      console.log("se despacho");
      bool && setBool(!bool);
    }
  }, [stats, products]);
  console.log(products);
  return (
    <div class="container">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3 class="box-title mt-5">Top de Productos: </h3>
        <div class="table-responsive">
          <table class="table table-striped ">
            <thead class="thead-dark">
              <tr>
                <th width="300">IMAGEN: </th>
                <th width="300">NOMBRE: </th>
                <th width="100">MARCA: </th>
                <th>TIPO: </th>
                <th>CANTIDAD VENDIDA: </th>
                <th>RECAUDACION P/ PRODUCTO: </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((e) => (
                  <tr>
                    <td>
                      <img src={e.imagen} width="150" />
                    </td>
                    <td>{e.nombre}</td>
                    <td>{e.marca}</td>
                    <td>
                      {e.tipo.charAt(0).toUpperCase() +
                        e.tipo.slice(1)}
                    </td>
                    <td>{e.buyQuantity}</td>
                    <td>${e.precio * e.buyQuantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
