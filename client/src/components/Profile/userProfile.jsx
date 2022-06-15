import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { auth } from "../../fb";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserDb, resetUserDb } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "../Review/ReviewCar";
import "./userProfileStyles.css";

import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
//import db from "../../../../api/src/db";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dbUser = useSelector((state) => state.dbUser);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const [endLoading, setEndLoading] = useState(false);
  const { id } = useParams();

  let revs = useSelector((state) => state.allReviews);
  const prodFind = prod.filter((e) => e.id === revs.productoId);
  console.log(prodFind, "productoId");

  let [bool, setBool] = useState(false);
  console.log("user", user);
  let allRevs = revs.filter((e) => user.uid === e.usuarioId);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(deleteReview(e.target.value));
    setBool(!bool);
  };
  const handleLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem("userputid", e.target.value);
    console.log(e.target.value, "soy el console");
    navigate(`/putreview/${e.target.name}`);
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserDb(user.uid));
    }

    setEndLoading(true);
    dispatch(getAllReviews());
    return () => {
      dispatch(resetUserDb());
      dispatch(getAllReviews());
    };
  }, [dispatch, endLoading, bool]);

  return (
    <section class="vh-100">
      <div class="container py-5 h-75">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-6 mb-4 mb-lg-0">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4 gradient-custom text-center text-black">
                  {dbUser?.image ? (
                    <img src={dbUser.image} height="100" width="100" />
                  ) : user.photoURL ? (
                    <img src={user.photoURL} height="100" width="100" />
                  ) : (
                    <img src="./images/default.jpg" height="100" width="100" />
                  )}
                  <h5 class="name mt-3  pl-3">{dbUser && dbUser.nombre}</h5>
                  <p class="idd  pl-3">{dbUser && dbUser.email}</p>
                  <a href="/profile/edit">
                    <button class="btn1 btn-dark  pl-3">Editar Perfil</button>
                  </a>
                </div>
                <div class="col-md-8">
                  {allRevs.length ? (
                    allRevs.map((r) => {
                      return (
                        <div class="card-body p-4" key={r.id} value={r.id}>
                          <ReviewCar
                            titulo={r.titulo}
                            comentario={r.comentario}
                            puntaje={r.puntaje}
                            producto={r.productoId}
                            fecha={r.createdAt}
                          />
                          <button
                            onClick={handleLocalStorage}
                            value={JSON.stringify(r)}
                            name={r.id}
                          >
                            ✏️
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div>No hay reviews!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
