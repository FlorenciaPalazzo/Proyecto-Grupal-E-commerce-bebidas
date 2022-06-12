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
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Verificado</th>
                  <th scope="col">Creado</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
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
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
