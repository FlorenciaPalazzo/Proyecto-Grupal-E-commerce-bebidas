import React, { useEffect } from "react";
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
import "./FilterStyles.css";

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

  return (
    <div className="div-filter">
      <div className="div-select">
        <select className="selector" name="" id="" onChange={handleBrand}>
          <option>Marcas</option>
          <option value="all">Todas</option>
          {brands &&
            brands.map((b) => (
              <option key={b} name={b} value={b}>
                {b}
              </option>
            ))}
        </select>
      </div>
      <div className="div-select">
        <select className="selector" onChange={handleType} defaultValue="Type">
          <option value="">Tipos</option>
          <option value="all">Todas</option>
          {/* puede sacarse */}
          <option value="cerveza">Birras</option>
          <option value="vino">Vinos</option>
          <option value="espumante">Espumantes</option>
          <option value="destilado">Destilados</option>
        </select>
      </div>
      <div className="div-select">
        <select
          className="selector"
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
      </div>
      <div className="div-select">
        <select
          className="selector"
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
      </div>
      <div className="div-select">
        <select
          className="selector"
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
      </div>
      <div className="div-select">
        <select
          className="selector"
          name=""
          id=""
          onChange={handleAZ}
          defaultValue="ABC"
        >
          <option value="all">ABC</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  );
}
