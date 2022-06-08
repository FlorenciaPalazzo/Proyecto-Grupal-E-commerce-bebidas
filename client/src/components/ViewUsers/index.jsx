import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../fb";
import { firebaseUsers, getUsersLoged } from "../../redux/actions";

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
    <div className="container">
      
      <div className="usersContainer">
        {usersLoged.length === 0 && firstReq ? (
          <span>
            {console.log("loading")}
            Loading users...
          </span>
        ) : (
          usersLoged.map((e) => {
            
            if (e.email === process.env.REACT_APP_ADMIN_EMAIL) return;
            return (
              <div key={e.nombre}>
                <hr />
                <p>Nombre: {e.nombre} {e.apellido && e.apellido}</p>
                <p>Email: {e.email}</p>
                {
                  e.isVerified ? 
                  <p>Verificado</p>
                  :
                  <p>No verificado</p>

                }
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
