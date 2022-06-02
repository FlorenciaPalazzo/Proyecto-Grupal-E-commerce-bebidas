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
      {product ? (
        <div className="detail-content">
          <h1 className="detail-name">{product.nombre}</h1>
          <div className="image-div">
            <img className="detail-image" src={product.imagen} alt="" />
          </div>

          <div className="detail-subcontent">
            <h4 className="detail-title">Brand: {product.marca}</h4>
            <h4 className="detail-title">Size: {product.ml} ml</h4>
            <h4 className="detail-title">
              Alcohol content: {product.graduacion} %
            </h4>
            <h4 className="detail-title">Price: $ {product.precio}</h4>
          </div>
          <p
            className="detail-description"
            dangerouslySetInnerHTML={{ __html: product.descripcion }}
          />
          <Link to="/home">
            <button className="button">Back</button>
          </Link>
          <Link to = {`/Review/${id}`}>
                <button>contanos tu experiencia.</button>
          </Link>
        </div>
      ) : (
        console.log("No hay nada acá")
      )}
              
    </div>
  );
}
