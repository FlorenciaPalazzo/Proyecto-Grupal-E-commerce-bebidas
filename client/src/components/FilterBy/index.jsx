import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByBrand,
  filterByBrandCerveza,
  filterByBrandDestilado,
  filterByBrandEspumante,
  filterByBrandVino,
  filterByGraduation,
  filterByML,
  filterByPrice,
  filterByType,
  getBrands,
  getProducts,
  orderBy,
} from "../../redux/actions";
// import "./FilterStyles.css";

export default function FilterBy({ setCurrentPage }) {
  const dispatch = useDispatch(); ///ver si lo dejo aca o lo saco
  const brands = useSelector((state) => state.brands); //ver esto
  const products = useSelector((state) => state.products);
  const cervezas = useSelector((state) => state.cervezas);
  // const cervezasCopy = useSelector((state) => state.cervezasCopy)
  const vinos = useSelector((state) => state.vinos);
  const espumantes = useSelector((state) => state.espumantes);
  const destilados = useSelector((state) => state.destilados);

  let filterCervezaMarca = [];
  let filterVinoMarca = [];
  let filterEspumanteMarca = [];
  let filterDestiladoMarca = [];

  cervezas.forEach((e) => {
    if (!filterCervezaMarca.includes(e.marca)) {
      filterCervezaMarca.push(e.marca);
    }
  });

  vinos.forEach((e) => {
    if (!filterVinoMarca.includes(e.marca)) {
      filterVinoMarca.push(e.marca);
    }
  });
  espumantes.forEach((e) => {
    if (!filterEspumanteMarca.includes(e.marca)) {
      filterEspumanteMarca.push(e.marca);
    }
  });
  destilados.forEach((e) => {
    if (!filterDestiladoMarca.includes(e.marca)) {
      filterDestiladoMarca.push(e.marca);
    }
  });

  const handleBrandCerveza = (e) => {
    e.preventDefault(); ///agregar a todos.
    setCurrentPage(1);
    dispatch(filterByBrandCerveza(e.target.value));
  };

  const handleBrandVino = (e) => {
    e.preventDefault(); ///agregar a todos.
    setCurrentPage(1);
    dispatch(filterByBrandVino(e.target.value));
  };
  const handleBrandEspumante = (e) => {
    e.preventDefault(); ///agregar a todos.
    setCurrentPage(1);
    dispatch(filterByBrandEspumante(e.target.value));
  };
  const handleBrandDestilado = (e) => {
    e.preventDefault(); ///agregar a todos.
    setCurrentPage(1);
    dispatch(filterByBrandDestilado(e.target.value));
  };
  const handleOrder = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderBy(e.target.value));
  };
  const resetButton = (e) => {
    e.preventDefault();
    /* 
    dispatch(getProducts(e.target.value)); */
    window.location.reload();
  };

  //////////////👇👇👇aqui modo oscuro 👇👇👇///////////
  //#region 
  // const [checked, setChecked] = useState(
  //   localStorage.getItem("theme") === "dark" ? true : false
  // );

  // useEffect(() => {
  //   dispatch(getProducts());
  //   document
  //     .getElementsByTagName("HTML")[0]
  //     .setAttribute("data-theme", localStorage.getItem("theme"));
  // }, [checked]);

  // const toggleThemeChange = () => {
  //   if (checked === false) {
  //     localStorage.setItem("theme", "dark");
  //     setChecked(true);
  //   } else {
  //     localStorage.setItem("theme", "light");
  //     setChecked(false);
  //   }
  // };
  //#endregion
  
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light py-4">
        <div class="container-md">
          <a class="navbar-brand" href="#"></a>
          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleBrandCerveza}
          >
            <option>Cervezas</option>
            <option value="all">Todas las cervezas</option>

            {filterCervezaMarca &&
              filterCervezaMarca.map((b) => (
                <option key={b} name={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleBrandVino}
          >
            <option>Vinos</option>
            <option value="all">Todos los vinos</option>

            {filterVinoMarca &&
              filterVinoMarca.map((b) => (
                <option key={b} name={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleBrandEspumante}
          >
            <option>Espumantes</option>
            <option value="all">Todos los espumantes</option>

            {filterEspumanteMarca &&
              filterEspumanteMarca.map((b) => (
                <option key={b} name={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleBrandDestilado}
          >
            <option>Destilados</option>
            <option value="all">Todos los destilados</option>

            {filterDestiladoMarca &&
              filterDestiladoMarca.map((b) => (
                <option key={b} name={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          <select class="form-select mx-3" name="" id="" onChange={handleOrder}>
            <option>Ordenar por:</option>
            <option disabled>Nombre</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option disabled>Graduacion</option>
            <option value="menorGraduacion">Menor graduacion°</option>
            <option value="mayorGraduacion">Mayor graduacion°</option>
            <option disabled>ML</option>
            <option value="ml_1">Envase menor</option>
            <option value="ml_2">Envase mayor</option>
            <option disabled>Precio</option>
            <option value="price_1">$ Menor precio</option>
            <option value="price_2">$ Mayor precio</option>
          </select>
          <button
            onClick={resetButton}
            type="button "
            class="btn btn-outline-warning  mx-3  bg-white text-dark"
          >
            Recargar
          </button>
        </div>
      </nav>
    </div>
  );
}
