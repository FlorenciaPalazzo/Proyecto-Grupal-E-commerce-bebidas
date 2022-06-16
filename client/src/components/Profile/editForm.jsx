import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../fb";
import FileBase64 from "react-file-base64";
import { getUserDb, resetUserDb, updateUser } from "../../redux/actions";
import { Navigate, useNavigate } from "react-router-dom";
import "./editFormStyles.css";
import swal from "sweetalert";
import validate from "./profileResources";
import Loading from "../Loading";
import NavBarSec from "../NavBarSec";

export default function EditForm() {
  const user = useSelector((state) => state.currentUser);
  const dbUser = useSelector((state) => state.dbUser);

  const loading = useSelector((state) => state.isLoading);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [surnameError, setSurnameError] = useState(null);
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(e.target.value, e.target.name, setNameError, setSurnameError);
  }
  function passwordHandle() {
    sendPasswordResetEmail(auth, user.email);
    setDisabledBtn(true);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    //put
    // console.log("se despacha esto", {
    //   id: user.uid,
    //   nombre: input.nombre,
    //   apellido: input.apellido,
    //   image: image,
    // });
    dispatch(
      updateUser({
        id: user.uid,
        nombre: input.nombre,
        apellido: input.apellido,
        image: image,
      })
    );
    updateProfile(auth.currentUser, {
      displayName: `${input.nombre} ${input.apellido}`,
    })
      .then(() => {
        swal({
          title: "Editado con exito ",
          type: "success",
          buttons: false,
          timer: 500,
        });
      })
      .then(() => dispatch(getUserDb(user.uid)))
      .catch((error) => {
        swal({
          title: "Ups... hubo un error",
          type: "warning",
          buttons: false,
          timer: 500,
        });
        console.log(error);
      });

    navigate("/profile");
  }
  // console.log("user selector", user);
  // console.log("imagen", dbUser);

  useEffect(() => {
    if (user) {
      dispatch(getUserDb(user.uid));
      console.log("seteo input");
      if (user.displayName) {
        let name = user.displayName.split(" ");
        setInput({
          nombre: name[0] ? name[0] : "",
          apellido: name[1] ? name[1] : "",
        });
        dbUser && setImage(dbUser.image);
      } else {
        setInput({
          nombre: "",
          apellido: "",
        });
        setImage(dbUser.image);
      }
    }
    return () => {
      if (user && user.isAdmin) {
        window.location.reload("/profile");
        navigate("/profile");
        window.location.reload();
      }
      console.log("Actualizo y me voy a la mierda");
      dispatch(resetUserDb());
    };
  }, [user]);
  console.log(input, user);
  return (
    <div>
      <NavBarSec />
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div class="container">
          <h1>Editar Perfil</h1>
          <hr />
          <div class="row">
            <div class="col-md-3">
              <div class="text-center">
                <h6>Elige una foto diferente</h6>
                <div className="base64back">
                  <FileBase64
                    type="file"
                    multiple={false} //
                    onDone={({ base64 }) => setImage(base64)}
                  />
                </div>
                {dbUser && (
                  <img
                    src={dbUser.image}
                    class="avatar img-circle"
                    alt="avatar"
                  />
                )}
              </div>
            </div>
            {/* Hasta aca andamos */}
            <div class="col-md-9 personal-info">
              <h3>Informacion personal</h3>
              <form class="form-horizontal" role="form">
                <div class="form-group">
                  <label class="col-lg-3 control-label" htmlFor="nombre">
                    Nombre:{" "}
                  </label>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      value={input.nombre}
                      name="nombre"
                      onChange={handleChange}
                      class="form-control"
                    />
                  </div>
                  {nameError && <span>{nameError}</span>}
                </div>

                <div class="form-group">
                  <label class="col-lg-3 control-label" htmlFor="apellido">
                    Apellido:{" "}
                  </label>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      value={input.apellido}
                      name="apellido"
                      onChange={handleChange}
                      class="form-control"
                    />
                    {surnameError && <span>{surnameError}</span>}
                    <br />
                    <div class="form-group" id="passwordChange">
                      <br />

                      <label
                        class="col-lm-3  control-label "
                        htmlFor="password"
                      >
                        Cambiar contraseña mediante email:{" "}
                      </label>
                      {!disabledBtn ? (
                        <button class="btn btn-dark" onClick={passwordHandle}>
                          Solicitar Cambio
                        </button>
                      ) : (
                        <div>
                          <button
                            class="btn btn-dark"
                            disabled
                            onClick={passwordHandle}
                          >
                            Solicitar Cambio
                          </button>
                          <span>
                            {" "}
                            Se envio email para restablecer contraseña
                          </span>
                        </div>
                      )}
                    </div>
                    <br />
                    {surnameError || nameError ? (
                      <button
                        type="button"
                        onClick={() =>
                          alert("Complete todos los campos correctamente")
                        }
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        class="btn btn-primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Guardar
                      </button>
                    )}
                  </div>
                </div>

                <br />
                <br />
              </form>
              {user && <img src={user.photoURL} style={{ width: "20%" }} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
