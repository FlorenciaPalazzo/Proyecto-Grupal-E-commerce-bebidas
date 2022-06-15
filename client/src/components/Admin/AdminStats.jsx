import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions";
import AdminPanel from "../AdminPanel";

export const AdminStats = () => {
  const dispatch = useDispatch();
  const stat = useSelector((state) => state.stats);
  useEffect(() => {
    dispatch(getStats());
  }, []);
  return (
    <div>
      <AdminPanel />
      <div class="body-stats">
        <div class="containter-stats">
          <div class="card-stats">Ventas: {stat.ventas}</div>
          <div class="card-stats">Productos: {stat.productos}</div>
          <div class="card-stats">Reviews totales: {stat.totalReview}</div>
          <div class="card-stats">Usuarios: {stat.usuarios}</div>
          <div class="card-stats">
            Usuarios verificados: {stat.verifiedUser}
          </div>
          <div class="card-stats">
            Usuarios no verificados: {stat.noVerifiedUser}
          </div>
          <div class="card-stats">Promedio de la pagina: {stat.pageProm}</div>
          <div class="card-stats">Reviews de productos: {stat.userReviews}</div>
          <div class="card-stats">Review de la página: {stat.pageReviews}</div>
        </div>
      </div>
    </div>
  );
};
