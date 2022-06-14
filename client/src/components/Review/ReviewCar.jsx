import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteReview, isAdmin } from "../../redux/actions";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../Loading";
export const ReviewCar = ({
  titulo,
  comentario,
  puntaje,
  producto,
  fecha,
  emailUsuario,
  usuarioId,
  id,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);
  const prod = useSelector((state) => state.products);
  let [bool, setBool] = useState(false);
  const filt = prod.find((e) => e.id === producto);
  const admin = useSelector((state) => state.isAdmin);
  console.log(admin, "EL ADMIN");

  const handleDelete = (e) => {
    e.preventDefault();
    swal({
      title: "¿Seguro que quieres borrar esta review?",
      text: "Le notificaremos al usuario que infrigió las normas de la página",
      type: "warning",
      buttons: {
        cancel: "Cancelar",
        cofirm: {
          text: "Borrar review",
          value: "confirm",
        },
      },
    })
      .then((value) => {
        if (value === "confirm") {
          dispatch(deleteReview(id));
          setBool(!bool);
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [bool, admin]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div class="m-4">
          <div class="card" s /* tyle="width: 300px;" */>
            {filt ? (
              <div>
                <img
                  /* width="10%" */
                  src={filt.imagen}
                  alt=""
                  class="w-100 border-bottom"
                />
                <h4 class="card-title">{filt.nombre}</h4>
                <p class="card-text">Comentario: {comentario}</p>
              </div>
            ) : (
              <div>
                <h3>Review de la página</h3>
                <img width="10%" src="./logo/logo.png" alt="" />
                <h4>Fecha: {fecha.split("T")[0]}</h4>
              </div>
            )}
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Fecha: {fecha.split("T")[0]}</li>
              <li class="list-group-item">
                Puntaje:{" "}
                <ReactStars
                  count={puntaje}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  edit={false}
                  color="#ffd700"
                />
              </li>
              <li class="list-group-item"> FECHA 4/4/2022</li>
            </ul>
            <div class="card-body">
              {/*  <a href="#" class="card-link">
                Ver usuario
              </a> */}
            </div>
            {/*  {emailUsuario ? (
              <Link to={`/adminemail/${usuarioId}`}>
                <p>Email del usuario: {emailUsuario}</p>
              </Link>
            ) : null} 
            <h4>Fecha: {fecha.split("T")[0]}</h4>
            <p>Titulo: {titulo}</p>
            <p>Comentario: {comentario}</p>
            Puntaje:{" "}
            <ReactStars
              count={puntaje}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              edit={false}
              color="#ffd700"
            />
            {admin ? (
              <button onClick={handleDelete} value={usuarioId}>
                ❌
              </button>
            ) : null} */}
          </div>
        </div>
      )}
    </div>
  );
};

{
  /* <div class="m-4">
    <div class="card" style="width: 300px;">
        <img src="https://images-ext-2.discordapp.net/external/MIt7KzGuBwBaDPhqYq1WeIZ3yBcXmp_p2ciIyMegnsc/%3Funique%3De6c383d/http/www.puroescabio.com.ar/web/image/product.product/44446/image_1024/%255B628%255D%2520COCODRILO%2520RED%2520BLEND%25201%25201500ml?width=676&height=676" class="w-100 border-bottom" alt="Sample Image">
        <div class="card-body">
            <h5 class="card-title">PRODUCTO VINO</h5>
            <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic error voluptatibus voluptas veniam, nihil voluptatem! Vitae commodi ducimus earum optio, mollitia, debitis eum suscipit inventore voluptate, error temporibus tempora magnamaaaaaaaaaaaaaaa?</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">MAIL valentinhjrehudk@gmail.com</li>
            <li class="list-group-item">PUNTAJE  * * * *</li>
          <li class="list-group-item">	FECHA 4/4/2022</li>
        </ul>
        <div class="card-body">
            <a href="#" class="card-link">Ver usuario</a>

        </div>
    </div>
</div> */
}
