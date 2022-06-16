import React, { useEffect, useState } from "react";
import validate from "./authServices";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, isAdmin, setUser } from "../../redux/actions";
/* import { Link } from "react-router-dom"; */
import Loading from "../Loading";
import swal from "sweetalert";
import "./Register.css";

import NavBarSec from "../NavBarSec";

function Register() {
  // { id, nombre, email, nacimiento, direccion, telefono }
  const [input, setInput] = useState({
    nombre: null,
    apellido: null,
    nacimiento: null,
    telefono: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [nameError, setNameError] = useState(null);
  const [surnameError, setSurnameError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [celErrror, setCelError] = useState(null);
  const [errorr, setError] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(
      e.target.value,
      e.target.name,
      input.password,
      setBirthError,
      setEmailError,
      setNameError,
      setPasswordError,
      setConfirmPasswordError,
      setSurnameError,
      setCelError
    );
  }
  function errorValidate(error) {
    console.log("ENTRO AL VALIDATE CON ESTE ERROR: ", error);
    setError(null);
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      setError("Ya existe un usuario con este mail");
      swal({
        title: " Ya existe un usuario con este mail",
        icon: "warning",
        buttons: false,
        timer: 5000,
      });
    } else if (error === "Firebase: Error (auth/user-not-found).") {
      setError("No existe un usuario con este mail");
      swal({
        title: "No existe un usuario con este mail",
        icon: "warning",
        buttons: false,
        timer: 5000,
      });
    } else if (error === "Firebase: Error (auth/wrong-password).") {
      setError("Se ingreso una contraseña incorrecta");
      swal({
        title: "Se ingreso una contraseña incorrecta",
        icon: "warning",
        buttons: false,
        timer: 5000,
      });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    console.log(input);
    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(async () => {
          let res = auth.currentUser;
          console.log("userrrrrrrr", res);
          dispatch(setUser(res));
          dispatch(isAdmin(res.email));
          sendEmailVerification(res);
          await updateProfile(res, {
            displayName: `${input.nombre} ${input.apellido}`,
          }).catch((err) => console.log(err));
          return res;
        })
        .then((user) => {
          console.log("se creo el usuario usuario", {
            ...input,
            id: user.uid,
            isVerified: user.isVerified,
          });
          console.log(user);
          dispatch(
            createUser({
              id: user.uid,
              nombre: input.nombre || "Usuario",
              apellido: input.apellido || "Google",
              email: input.email,
              nacimiento: input.nacimiento,
              telefono: input.telefono,
              isAdmin: input.email === process.env.REACT_APP_ADMIN_EMAIL,
              isVerified: user.emailVerified,
              image: user.photoURL || null,
            })
          );
        })
        .then(() => navigate("/"))
        .catch((err) => {
          console.log("ENTRO AL CATCH");
          console.log(err);
          errorValidate(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const loading = useSelector((state) => state.isLoading);
  const isLoged = useSelector((state) => state.isLoged);
  useEffect(() => {
    isLoged && navigate("/");
  }, [isLoged]);
  console.log(input);

  const handleAlertRegister = (e) => {
    e.preventDefault();
    swal({
      title: "Favor de completar todos los campos ",
      icon: "warning",
    });
  };

  async function googleHandleSubmit(e) {
    setError(null);
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userCred = result.user;
        console.log("rrrrrrrrrrrrrr", userCred);
        dispatch(
          createUser({
            id: userCred.uid,
            nombre: userCred.displayName || "Usuario",
            apellido: userCred.displayName || "Google",
            email: userCred.email,
            isAdmin: userCred.email === process.env.REACT_APP_ADMIN_EMAIL,
            isVerified: userCred.emailVerified,
            image: userCred.photoURL || null,
          })
        );
        return userCred;
      })
      .then((user) => {
        console.log("seteoooo");
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error.message);
        errorValidate(error.message);
      });
  }

  return (
    <div>
      <NavBarSec />
      <div className="registro-body">
        <div className="registro-img"></div>
        {loading && !isLoged ? (
          <Loading />
        ) : (
          <div className="registro-cont">
            <div className="registro-form">
              <p className="registro-titulo">Registrate</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="registro-form">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Ingrese su apellido"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="telefono">Celular</label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Ingrese su teléfono"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="nacimiento">Nacimiento</label>
                  <input
                    type="text"
                    name="nacimiento"
                    placeholder="dd/mm/yyyy"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Ingrese su email"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    onChange={handleChange}
                  />
                </div>

                <div className="registro-form">
                  <label htmlFor="confirmPassword">
                    Confirma tu contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    placeholder="Confirme su contraseña"
                  />
                </div>

                {!passwordError &&
                !surnameError &&
                !nameError &&
                !emailError &&
                !birthError &&
                !celErrror &&
                !confirmPasswordError &&
                input.nombre &&
                input.telefono &&
                input.apellido &&
                input.password &&
                input.nacimiento &&
                input.email ? (
                  <button className="registro-btn">Registrarse</button>
                ) : (
                  <button
                    className="registro-btn"
                    type="button"
                    onClick={handleAlertRegister}
                  >
                    Registrarse
                  </button>
                )}

                <div>
                  <p className="registro-text">o registrate con Google</p>
                  <button
                    className="registro-btn-google"
                    onClick={googleHandleSubmit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="white"
                      class="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {passwordError ||
        surnameError ||
        nameError ||
        emailError ||
        birthError ||
        celErrror ||
        confirmPasswordError ? (
          <div className="registro-error">
            {nameError && <span>{nameError}</span>}
            <br />
            {surnameError && (
              <span /* className="register-span" */>{surnameError}</span>
            )}
            <br />
            {celErrror && (
              <span /* className="register-span" */>{celErrror}</span>
            )}
            <br />
            {birthError && <span>{birthError}</span>}
            <br />

            {emailError && <span>{emailError}</span>}
            <br />
            {passwordError && <span>{passwordError}</span>}
            <br />
            {confirmPasswordError && <span>{confirmPasswordError}</span>}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
