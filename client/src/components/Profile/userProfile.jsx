import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { auth } from "../../fb";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserDb, resetUserDb } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";
//import db from "../../../../api/src/db";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const dbUser = useSelector((state) => state.dbUser);
  let revs = useSelector((state) => state.allReviews);
  console.log("user", user);
  const [endLoading, setEndLoading] = useState(false)
  let allRevs = revs.filter((e) => user.uid === e.usuarioId);
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview());
  };
  const handlePut = (e) => {
    e.preventDefault();
    dispatch(putReview());
  };
  useEffect(() => {
    /* dispatch(getReviewPage());
    dispatch(getReview()); */
    if(user){
      console.log("busco el puto db");
       dispatch(getUserDb(user.uid))
      }
    dispatch(getAllReviews());
    setEndLoading(true)
    return(() => {
      console.log("Aactualizo y me voy a la mierda");
      dispatch(resetUserDb())
    })
  }, [dispatch, endLoading]);
console.log("dbUser",dbUser);
  return (
    <div>
      <h1>Perfil de usuario</h1>
      <h2>{user && user.email}</h2>
      <div>
        {!user.photoURL && dbUser?.image ? (
          <img src={dbUser.image} alt="" />
        ) : user.photoURL  ? (
          <img src={user.defaultURL} alt="" />
        ) : (
          <img src="./images/default.jpg" alt="" />
        )}
        <h2>Reviews</h2>
        {
          allRevs &&
            allRevs.map((e) => {
              return (
                <div key={e.id}>
                  <p>Titulo: {e.titulo}</p>
                  <p>Comentario: {e.comentario}</p>
                  <p>
                    Puntaje:{" "}
                    <ReactStars
                      count={e.puntaje}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      edit={false}
                      color="#ffd700"
                    />
                  </p>
                  <button onClick={handlePut}>✏️</button>
                  <button onClick={handleDelete}>❌</button>
                </div>
              );
            })
          /*  : (
          <div>No hay reviews hasta el momento</div>
        ) */
        }
      </div>
    </div>
  );
}

export default UserProfile;
