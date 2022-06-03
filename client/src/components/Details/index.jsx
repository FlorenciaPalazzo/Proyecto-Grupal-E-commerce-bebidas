import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById } from "../../redux/actions";
import "./DetailStyles.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const product = useSelector((state) => state.detail);

  return (
    <div className="detail-background">
      <Link to="/home">
            <button className="button">Back</button>
          </Link>
      {product ? (
        <div className="detail-content">
          <div className="detail-compra">
            <h1 className="detail-name">{product.nombre}</h1>
            <h1 className="detail-title">Price: $ {product.precio}</h1>
            <button className="button-shop">
          Añadir al carrito
        </button>
          </div>
          <div className="image-div">
            <img className="detail-image" src={product.imagen} alt="" />
          </div>
          
          
          <div className="detail-description">
            <div className="detail-left">
            <p className="detail-title">Brand: {product.marca}</p>
            <p className="detail-title">Size: {product.ml} ml</p>
            <p className="detail-title">
              Alcohol content: {product.graduacion} %
            </p>
            </div>
            <div className="detail-right">
            <p className="detail-title" dangerouslySetInnerHTML={{ __html: product.descripcion }}/>
            </div>
          </div>
          
        </div>
      ) : (
        console.log("No hay nada acá")
      )}
    </div>
  );
}
