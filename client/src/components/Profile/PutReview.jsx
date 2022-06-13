import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { findReviewId, getProducts, getReview, postReview, putReview } from "../../redux/actions";



export default function PutReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
//   const usuario = useSelector((state) => state.currentUser);
  let products = useSelector((state) => state.products);
//   let [bool, setBool] = useState(false);
  const review = useSelector((state) => state.findreview);
  console.log(review, 'traigo reviews')
    
  let prod = products.filter((e) => e.id === id);
//   let idUser = localStorage.getItem("user");
//   useEffect(() => {}, [usuario]);
   let revsLocal = JSON.parse(localStorage.getItem("userputid")) 
   console.log(revsLocal, 'AAAAAAAAAAAAAAAAAAAA')
    const [input, setInput] = useState({
        titulo: revsLocal.titulo,
        comentario: revsLocal.comentario,
        puntaje: revsLocal.puntaje,
        usuarioId: revsLocal.usuarioId,
        productoId: revsLocal.productoId,
        id: revsLocal.id,
      });

      const handleOnChange = (e) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };
      const ratingChanged = (newRating) => {
        setInput({ ...input, puntaje: newRating });
      };
      
    //   const handlePut = (e) => {
    //     e.preventDefault();
    //     console.log(input, 'HANDLE PPUT')
    //     setBool(!bool);
        
    //   };

      const handleSubmit = (e) => {
        e.preventDefault();
        swal({
          title: "Review dejada con exito ",
          type: "success",
          icon: "success",
          buttons: false,
          timer: 800,
        });
        dispatch(putReview(input));
        console.log(input, 'dispatch input')
        setInput({
          titulo: "",
          comentario: "",
          puntaje: "",
          usuarioId: "",
        productoId: "",
        id: "",
        });
        navigate("/profile");
      };
      useEffect(() => {
        dispatch(findReviewId(id))
        return() => {
            dispatch(findReviewId(id))  
        }
    }, [dispatch]);   
    return (
        <div>
          {prod && prod[0] ? (
            <div>
              <h1>¡Contanos que te parecio {prod[0].nombre}!</h1>
              <img src={prod[0].imagen} width="30%" />
            </div>
          ) : (
            <h1>¡Modifica tu review!</h1>
          )}
    
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Titulo:</label>
              <input
                type="text"
                placeholder={input.titulo}
                value={input.titulo}
                name="titulo"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Comentario:</label>
              <textarea
                placeholder={input.comentario}
                value={input.comentario}
                name="comentario"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
    
            <div>
              <button className="button" type="submit">
                Modificar
              </button>
            </div>
            <div>
              <Link to="/profile">
                <button className="button">Atras</button>
              </Link>
            </div>
          </form>
        </div>
      );
}