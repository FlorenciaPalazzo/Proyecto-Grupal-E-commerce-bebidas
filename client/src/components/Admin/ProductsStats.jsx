import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getStats, getTopProds } from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import "./ProductsStats.css";

export default function ProductsStats() {
  const stats = useSelector((state) => state.stats);
  const products = useSelector((state) => state.topProds);
  const admin = useSelector((state) => state.isAdmin);
  const loading = useSelector((state) => state.isLoading);

  console.log(admin);
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
    <div class="container" className="ProductsStats-body">
      {loading ? (
        <Loading />
      ) : admin ? (
        <div>
          <AdminPanel />
          <div
            class="col-lg-12 col-md-12 col-sm-12"
            className="ProductsStats-conteiner"
          >
            <h3 class="box-title mt-5">Top de Productos: </h3>
            <div class="table-responsive">
              <table class="table table-striped ">
                <thead class="thead-dark">
                  <tr>
                    <th className="ProductsStats-display">IMAGEN: </th>
                    <th className="ProductsStats-display">NOMBRE: </th>
                    <th className="ProductsStats-display">MARCA: </th>
                    <th className="ProductsStats-display">TIPO: </th>
                    <th className="ProductsStats-display">CANTIDAD: </th>
                    <th className="ProductsStats-display">GANANCIA: </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((e) => (
                      <tr>
                        <td className="">
                          <img src={e.imagen} width="100" />
                        </td>
                        <td>{e.nombre}</td>
                        <td className="ProductsStats-display">{e.marca}</td>
                        <td className="ProductsStats-display">
                          {e.tipo.charAt(0).toUpperCase() + e.tipo.slice(1)}
                        </td>
                        <td className="ProductsStats-table">{e.buyQuantity}</td>
                        <td className="ProductsStats-table">
                          ${e.precio * e.buyQuantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1> No eres administrador </h1>
          <Link to="/">
            <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
              Volver al home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
