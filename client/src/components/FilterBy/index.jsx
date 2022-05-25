import React from "react";
import { useDispatch } from "react-redux";
import {
  filterByAZ,
  filterByBrand,
  filterByGraduation,
  filterByML,
  filterByPrice,
  filterByType,
} from "../../redux/actions";

export default function FilterBy() {
  const dispatch = useDispatch();

  const handleBrand = (e) => {
    dispatch(filterByBrand(e.target.value));
  };
  const handleType = (e) => {
    dispatch(filterByType(e.target.value));
  };
  const handleGraduation = (e) => {
    dispatch(filterByGraduation(e.target.value));
  };
  const handleML = (e) => {
    dispatch(filterByML(e.target.value));
  };
  const handlePrice = (e) => {
    dispatch(filterByPrice(e.target.value));
  };
  const handleAZ = (e) => {
    dispatch(filterByAZ(e.target.value));
  };
  return (
    <div>
      <div>
        <select name="" id="" onChange={handleBrand}>
          <option>esperando rutas...</option>
        </select>
      </div>
      <div>
        <select onChange={handleType} defaultValue="Type">
          <option value="">Type</option>
          <option value="all">All</option>
          {/* puede sacarse */}
          <option value="Cerveza">Beer</option>
          <option value="Vino">Wine</option>
          <option value="Espumante">Sparkling Wine</option>
          <option value="Destilados">Destilled</option>
        </select>
      </div>
      <div>
        <select
          name=""
          id=""
          onChange={handleGraduation}
          defaultValue="Graduation"
        >
          <option value="">Graduation</option>
          <option value="all">All</option>
          {/* puede sacarse */}
          <option value="low">3°-20°</option>
          <option value="medium">21°-38°</option>
          <option value="high">39°-55°</option>
        </select>
      </div>
      <div>
        <select name="" id="" onChange={handleML} defaultValue="ML">
          <option value="">ML</option>
          <option value="all">All</option>
          {/* puede sacarse */}
          <option value="ml_1">150ml-400ml</option>
          <option value="ml_2">400ml-750ml</option>
          <option value="ml_3">750ml-950ml</option>
          <option value="ml_4">950ml-1500ml</option>
        </select>
      </div>
      <div>
        <select name="" id="" onChange={handlePrice} defaultValue="Price">
          <option value="">Price</option>
          <option value="all">All</option>
          {/* puede sacarse */}
          <option value="price_1">-$500</option>
          <option value="price_2">$500-$2000</option>
          <option value="price_3">$2000-$5000</option>
          <option value="price_4">$5000-$10000</option>
          <option value="price_5">$5000-$10000</option>
          <option value="price_6">$10000-$20000</option>
          <option value="price_7">$20000-$35000</option>
          <option value="price_8">+$35000</option>
        </select>
      </div>
      <div>
        <select name="" id="" onChange={handleAZ} defaultValue="ABC">
          <option value="all">ABC</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  );
}
