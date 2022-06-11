import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByAZ,
  filterByBrand,
  filterByGraduation,
  filterByML,
  filterByPrice,
  filterByType,
  getBrands,
} from "../../redux/actions";
// import "./FilterStyles.css";

export default function FilterBy({ setCurrentPage }) {
  const dispatch = useDispatch(); ///ver si lo dejo aca o lo saco
  const brands = useSelector((state) => state.brands); //ver esto
  // const [ order, setOrder] = useState("");

  const handleBrand = (e) => {
    e.preventDefault(); ///agregar a todos.
    setCurrentPage(1);
    dispatch(filterByBrand(e.target.value));
    // setOrder(`Organized ${e.target.value}`)
  };
  const handleType = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByType(e.target.value));
  };
  const handleGraduation = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByGraduation(e.target.value));
  };
  const handleML = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByML(e.target.value));
  };
  const handlePrice = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByPrice(e.target.value));
  };
  const handleAZ = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByAZ(e.target.value));
  };

  //////////////👇👇👇aqui modo oscuro 👇👇👇///////////

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
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
          <select class="form-select mx-3" name="" id="" onChange={handleBrand}>
            <option>Marcas</option>
            <option value="all">Todas</option>
            {brands &&
              brands.map((b) => (
                <option key={b} name={b} value={b}>
                  {b}
                </option>
              ))}
          </select>

          <select
            class="form-select mx-3 "
            onChange={handleType}
            defaultValue="Type"
          >
            <option value="">Tipos</option>
            <option value="all">Todas</option>
            {/* puede sacarse */}
            <option value="cerveza">Birras</option>
            <option value="vino">Vinos</option>
            <option value="espumante">Espumantes</option>
            <option value="destilado">Destilados</option>
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleGraduation}
            defaultValue="Graduation"
          >
            <option value="">Graduacion</option>
            <option value="all">Todas</option>
            {/* puede sacarse */}
            <option value="low">3°-20°</option>
            <option value="medium">21°-38°</option>
            <option value="high">39°-55°</option>
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleML}
            defaultValue="ML"
          >
            <option value="">ML</option>
            <option value="all">Todos</option>
            {/* puede sacarse */}
            <option value="ml_1">150ml-400ml</option>
            <option value="ml_2">400ml-750ml</option>
            <option value="ml_3">750ml-950ml</option>
            <option value="ml_4">950ml-1500ml</option>
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handlePrice}
            defaultValue="Price"
          >
            <option value="">Precio</option>
            <option value="all">Todos</option>
            {/* puede sacarse */}
            <option value="price_1">-$500</option>
            <option value="price_2">$500-$2000</option>
            <option value="price_3">$2000-$5000</option>
            <option value="price_4">$5000-$10000</option>
            <option value="price_5">$10000-$20000</option>
            <option value="price_6">$20000-$35000</option>
            <option value="price_7">+$35000</option>
          </select>

          <select
            class="form-select mx-3"
            name=""
            id=""
            onChange={handleAZ}
            defaultValue="ABC"
          >
            <option value="all">ABC</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>

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
