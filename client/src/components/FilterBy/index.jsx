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

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    dispatch(getProducts());
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  /////////////////👆👆👆aqui modo oscuro 👆👆👆/////////////////
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

          {/* 👇👇👇modo oscuro para el render 👇👇👇*/}
          <div class="d-flex justify-content-between me-4">
            <div class="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-brightness-high"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </div>

            <div class="form-check form-switch d-flex flex-row-reverse  my-2 me-2">
              <input
                class="form-check-input p-2 bg-dark  "
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                defaultChecked={checked}
                onChange={() => toggleThemeChange()}
              />
            </div>

            <div class="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-moon"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
