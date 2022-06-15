import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { auth } from "../../fb";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserDb, resetUserDb } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "../Review/ReviewCar";
import './userProfile.css'
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
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const dbUser = useSelector((state) => state.dbUser);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const [endLoading, setEndLoading] = useState(false);
  const {id} = useParams();

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
  localStorage.setItem("userputid", e.target.value)
  console.log(e.target.value, 'soy el console')
    navigate(`/putreview/${e.target.name}`)
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
                  <button class="profile-edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg></button>               
            </Link>
            </div>
        </div>

        <div class="row">
              <div className="infoposition">
                <div class="profile-work">
                    <p>{user && user.displayName}</p>
                   <p>{user && user.email}</p>
                   <p>{dbUser && dbUser.telefono}</p>
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
