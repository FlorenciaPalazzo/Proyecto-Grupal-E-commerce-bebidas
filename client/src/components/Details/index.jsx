import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById, getReview } from "../../redux/actions";
import "./DetailStyles.css";
import ReactStars from "react-rating-stars-component";
import swal from 'sweetalert';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const verified = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const isLoged = useSelector((state) => state.isLoged);
  const product = useSelector((state) => state.detail);
  const rev = useSelector((state) => state.review);
  console.log(rev, 'SOY EL REV')
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReview(id))
  }, [dispatch, id]);

  const handleAlertReview = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para dejar una reseña ⭐⭐⭐!",
      buttons: {
        cancel: 'Ahorita no joven',
        register: {
          text: 'Registrarse',
          value: 'register'
        },
             login: {
          text: 'Iniciar sesion',
          value: 'login'
        }
      },
      icon: "warning",
    }).then(value => {
      switch (value) {
        case 'register':
          navigate('/register')
        case 'login':
          navigate('/login')

      }
    })
  }

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
          <div >
            {rev.length ? rev.map(e => {return(
              <div className="detail-description">
                <p>Titulo: {e.titulo}</p>
                <p>Comentario: {e.comentario}</p>
                <p>Puntaje: <ReactStars
                count={e.puntaje}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                edit={false}
                color="#ffd700"
              /></p>
              </div>
            )}): 
            
            <div className="detail-description">no hay reviews</div>
            }
              
          </div>
          <Link to="/home">
            <button className="button">Back</button>
          </Link>
          {isLoged?(
          <Link to = {`/Review/${id}`}>
                <button  className="button">Contanos tu experiencia</button>
          </Link>): (
              <button onClick={handleAlertReview} className='button' >Contanos tu experiencia</button>
          )}
        </div>
      ) : (
        console.log("No hay nada acá")
      )}
              
    </div>
  );
}
