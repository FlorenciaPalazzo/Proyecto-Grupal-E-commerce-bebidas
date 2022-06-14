import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts} from "../../redux/actions";
import Card from "../Card";
import NavBarSec from "../NavBarSec";
import './Offers.css'

export default function Offers() {
  const productsOffers = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log("soyproductoffers", productsOffers);

  let arrayOffers = [];

  productsOffers.map((e) => {
    if (e.nombre === "CORONA 710ml x 3 (Promoción)") arrayOffers.push(e);
    if (
      e.nombre === "SALENTEIN EXTRA BRUT 750ml x 6 (Promoción)-No incluye caja"
    )
      arrayOffers.push(e);
    if (e.nombre === "SMIRNOFF WATERMELON 750ml 3x2 (Promoción)")
      arrayOffers.push(e);
  });
  console.log(arrayOffers);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div >
      <NavBarSec/>
      <div className="Offers-titulo">
      <h2>Ofertas Imperdibles</h2>
      </div>
      <div className="Offers-contenedor">
      {arrayOffers.map((e) => {
        return (
          
          <div key={e.id} className="div-key-card">
            <Link to={"/bebida/" + e.id}>
            <div className="Offers-singular" >
            <Card
              nombre={e.nombre}
              imagen={e.imagen}
              id={e.id}
              marca={e.marca}
              ml={e.ml}
              graduacion={e.graduacion}
              precio={e.precio}
            />
            </div>
            </Link>
          </div>
        );
      })}
      </div>
    </div>
  );
}
