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
 

  let [bool, setBool] = useState(false);
  console.log("user", user); console.log("dbuser", dbUser);
  let allRevs = revs.filter((e) => user.uid === e.usuarioId);
  console.log('Reviews', allRevs)

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
      <div class="container emp-profile"  >
      <form method="post">
          <div class="row">
              <div class="col-md-4">
                  <div class="profile-img">
                  {dbUser?.image ? (
                      <img src={dbUser.image} height="90" width="90" />
                    ) : user.photoURL ? (
                      <img src={user.photoURL} height="90" width="90" />
                    ) : (
                      <img src="./images/default.jpg" height="100" width="100" />
                    )}
                  </div>
              </div>
            <div className="positionBtn" >
              <Link to='/profile/edit'>
                    <button class="profile-edit-btn">Editar Perfil</button>               
              </Link>
              </div>
          </div>
  
          <div class="row">
                <div className="infoposition">
              <div class="col-md-4">
                  <div class="profile-work">
                      <h5>{user && user.displayName}</h5>
                     <p>{user && user.email}</p>
                     <p>{dbUser && dbUser.telefono}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-8" className="containerreviews">
                  <div class="tab-content profile-tab" id="myTabContent">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <h2>Reviews</h2>
            <div className="user-profile-contenedor">
          {allRevs.length ? (
            allRevs.map((r) => {
              return (
                <div key={r.id} value={r.id} className='aaaaaaa' >
                  <ReviewCar
                    titulo={r.titulo}
                    comentario={r.comentario}
                    puntaje={r.puntaje}
                    producto={r.productoId}
                    fecha={r.createdAt}
                  />
                  <div className="boton-editar-rev">
                  <button onClick={handleLocalStorage} value={JSON.stringify(r)} name={r.id}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                  </svg>
                  </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No hay reviews!</div>
          )}</div>
                      </div>
                  </div>
              </div>
          </div>
      </form>           
  </div>
    )
}

export default UserProfile;
