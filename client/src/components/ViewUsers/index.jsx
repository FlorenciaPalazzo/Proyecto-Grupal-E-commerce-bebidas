import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../fb";
import { firebaseUsers, getUsersLoged } from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import "./ViewUsers.css";
export default function ViewUsers() {
  const usersLoged = useSelector((state) => state.usersLoged);
  const dispatch = useDispatch();
  const [firstReq, setReq] = useState(true);

  useEffect(() => {
    if (usersLoged && usersLoged.length === 0 && firstReq) {
      dispatch(getUsersLoged());
      setReq(false);
    }
    console.log(usersLoged);
  }, [usersLoged]);
  return (
    <div>
      <AdminPanel />
      <div className="container">
        <div className="usersContainer">
          {usersLoged.length === 0 && firstReq ? (
            <span>
              {console.log("loading")}
              Loading users...
            </span>
          ) : (
            <table border="groove">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Verificado</th>
                <th>Creado</th>
              </tr>

              {usersLoged.map((e) => {
                if (e.email === process.env.REACT_APP_ADMIN_EMAIL) return;
                return (
                  <tr>
                    <td>
                      {e.nombre} {e.apellido && e.apellido}
                    </td>
                    <td>{e.email}</td>
                    <td>{e.isVerified ? "Verificado" : "No verificado"}</td>
                    <td>{e.createdAt.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
