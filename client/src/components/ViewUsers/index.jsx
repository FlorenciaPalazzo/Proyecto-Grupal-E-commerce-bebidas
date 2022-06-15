import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../fb";
import { firebaseUsers, getUsersLoged } from "../../redux/actions";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import NavBarSec from "../NavBarSec";
import "./ViewUsers.css";
export default function ViewUsers() {
  const usersLoged = useSelector((state) => state.usersLoged);
  const admin = useSelector((state) => state.isAdmin);
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const [firstReq, setReq] = useState(true);

  function handleDeleteUser(e) {
    //   getAuth()
    // .deleteUser(uid)
    // .then(() => {
    //   console.log('Successfully deleted user');
    // })
    // .catch((error) => {
    //   console.log('Error deleting user:', error);
    // });
  }
  function handleDate(date) {
    let d = date.split("-");
    return `${d[2]}/${d[1]}/${d[0]}`;
  }

  useEffect(() => {
    if (usersLoged && usersLoged.length === 0 && firstReq) {
      dispatch(getUsersLoged());
      console.log("SE DESPACHO");
      setReq(false);
    }
    console.log(usersLoged);
  }, [usersLoged, admin]);
  return (
    <div>
      {loading || !usersLoged.length ? (
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
                        <th scope="col" class="text-center">
                          Nombre
                        </th>
                        <th scope="col" class="text-center">
                          Email
                        </th>
                        <th scope="col" class="text-center">
                          Verificado
                        </th>
                        <th scope="col" class="text-center">
                          Creado
                        </th>
                        <th scope="col" class="text-center"></th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {usersLoged.map((e) => {
                        if (e.email === process.env.REACT_APP_ADMIN_EMAIL)
                          return;
                        return (
                          <tr>
                            <td class="text-center">
                              {e.nombre} {e.apellido && e.apellido}
                            </td>
                            <td class="text-center">{e.email}</td>
                            {e.isVerified ? (
                              <td class="text-center">
                                <span class="badge text-bg-success">
                                  Verificado
                                </span>
                              </td>
                            ) : (
                              <td class="text-center">
                                <span class="badge text-bg-danger">
                                  No Verificado
                                </span>
                              </td>
                            )}
                            <td class="text-center">
                              {handleDate(e.createdAt.slice(0, 10))}
                            </td>
                            <td></td>
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
        <div>
          {/* <NavBarSec /> */}
          <h1> No eres administrador </h1>
          <Link to="/">
            <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
              Volver al home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
