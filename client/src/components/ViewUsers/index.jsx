import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../fb";
import { firebaseUsers, getUsersLoged } from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import "./ViewUsers.css";
export default function ViewUsers() {
  const usersLoged = useSelector((state) => state.usersLoged);
  const admin = useSelector((state) => state.isAdmin);
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const [firstReq, setReq] = useState(true);

  useEffect(() => {
    if (usersLoged && usersLoged.length === 0 && firstReq) {
      dispatch(getUsersLoged());
      setReq(false);
    }
    console.log(usersLoged);
  }, [usersLoged, admin]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : admin ? (
        <div>
          <AdminPanel />
          <div className="viewusers-borde">
            <div className="viewusers-cont">Usuarios</div>
            <div>
              <div className="">
                {usersLoged.length === 0 && firstReq ? (
                  <span>
                    {console.log("loading")}
                    Loading users...
                  </span>
                ) : (
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Verificado</th>
                        <th scope="col">Creado</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {usersLoged.map((e) => {
                        if (e.email === process.env.REACT_APP_ADMIN_EMAIL)
                          return;
                        return (
                          <tr>
                            <td>
                              {e.nombre} {e.apellido && e.apellido}
                            </td>
                            <td>{e.email}</td>
                            <td>
                              {e.isVerified ? "Verificado" : "No verificado"}
                            </td>
                            <td>{e.createdAt.slice(0, 10)}</td>
                            <td>
                              <div className="viewusers-cont-btn">
                                <button className="viewusers-btn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                  </svg>
                                </button>
                                <button className="viewusers-btn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1> No eres administrador </h1>
      )}
      {/* <Link to="/">
        <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
          Volver al home
        </button>
      </Link> */}
    </div>
  );
}
