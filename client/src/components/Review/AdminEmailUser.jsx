import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearState,
  getAllReviews,
  getReviewByUser,
  getUserById,
} from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import { ReviewCar } from "./ReviewCar";

export const AdminEmailUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();
  /*  console.log(id); */
  const dispatch = useDispatch();
  // const allRevs = useSelector((state) => state.allReviews);
  const allRevs = useSelector((state) => state.userReviews);
  console.log("allRevs", allRevs);
  const userdb = useSelector((state) => state.userId);

  useEffect(() => {
    if (!isLoading) {
      if (user && isAdmin) {
        dispatch(getUserById(id));
        dispatch(getReviewByUser(id));
      } else {
        navigate("/*");
      }
    }
    return () => {
      dispatch(clearState());
    };
  }, [dispatch,isLoading]);

  return (
    <div>
      {isLoading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="admin-detail-rev-madre">
          <AdminPanel />
          <h1>Reviews del usuario {userdb.email}</h1>
          <div className="admin-detail-rev-contenedor">
            {allRevs.length ? (
              allRevs.map((e) => {
                return (
                  <div className="admin-detail-rev-carta">
                    <ReviewCar
                      titulo={e.titulo}
                      comentario={e.comentario}
                      puntaje={e.puntaje}
                      producto={e.productoId}
                      fecha={e.createdAt}
                      emailUsuario={userdb.email}
                      usuarioId={e.usuarioId}
                      key={e.id}
                      id={e.id}
                    />
                  </div>
                );
              })
            ) : (
              <p>No hay reviews</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
