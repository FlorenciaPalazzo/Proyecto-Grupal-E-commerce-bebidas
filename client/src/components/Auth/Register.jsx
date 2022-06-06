import React, { useEffect, useState } from "react";
import validate from "./authServices";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, isAdmin, setUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import "./Styles/RegisterStyles.css";

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

  const [error, setError] = useState(null);
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
      setSurnameError
    );
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
              nombre: input.nombre,
              apellido: input.apellido,
              email: input.email,
              nacimiento: input.nacimiento,
              telefono: input.telefono,
              isAdmin: input.email === process.env.REACT_APP_ADMIN_EMAIL,
              isVerified: user.emailVerified,
              image: user.photoURL || null
            })
          );
        })
        .then(() => navigate("/home"))
        .catch((err) => setError(err.message));
    } catch (error) {
      console.log(error);
    }
  }

  const loading = useSelector((state) => state.isLoading);
  const isLoged = useSelector((state) => state.isLoged);
  useEffect(() => {
    isLoged && navigate("/home");
  }, [isLoged]);
  console.log(input);

  return (
    <div className="register-background">
      <img src="./images/formsBackground.jpg" alt="" />
      <Link to="/">
        <img className="register-logo" src="./logo/logo.png" alt="loguito" />
      </Link>
      {loading && !isLoged ? (
        <Loading />
      ) : (

        <div className="register-main">
          <h1 className="forms-title">Registro</h1>
          <div className="register-container">
            {error && <span className="register-span">{error}</span>}
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="label-input">
                <label htmlFor="nombre">Nombre</label>
                <input
                  className="register-input"
                  type="text"
                  name="nombre"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>

              {nameError && <span className="register-span">{nameError}</span>}

              <br />
              <div className="label-input">
                <label htmlFor="apellido">Apellido</label>
                <input
                  className="register-input"
                  type="text"
                  name="apellido"
                  placeholder="Enter your surname"
                  onChange={handleChange}
                />
              </div>

              {surnameError && (
                <span className="register-span">{surnameError}</span>
              )}
              <br />
              <div className="label-input">
                <label htmlFor="telefono">Celular</label>
                <input
                  className="register-input"
                  type="tel"
                  name="telefono"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
              </div>

              <br />
              <div className="label-input">
                <label htmlFor="nacimiento">Nacimiento</label>
                <input
                  className="register-input"
                  type="text"
                  name="nacimiento"
                  placeholder="dd/mm/yyyy"
                  onChange={handleChange}
                />
              </div>

              {birthError && (
                <span className="register-span">{birthError}</span>
              )}
              <br />
              <div className="label-input">
                <label htmlFor="email">Email</label>
                <input
                  className="register-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              {emailError && (
                <span className="register-span">{emailError}</span>
              )}
              <br />
              <div className="label-input">
                <label htmlFor="password">Contraseña</label>
                <input
                  className="register-input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              {passwordError && (
                <span className="register-span">{passwordError}</span>
              )}
              <br />
              <div className="label-input">
                <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                <input
                  className="register-input"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                />
              </div>

              {confirmPasswordError && (
                <span className="register-span">{confirmPasswordError}</span>
              )}
              <br />

              {!passwordError &&

              !surnameError &&
              !nameError &&
              !emailError &&
              !birthError &&
              input.nombre &&
              input.apellido &&
              input.password &&
              input.nacimiento &&
              input.email ? (
                <button className="button-register">Registrarse</button>

              ) : (
                <button
                  className="button-register"
                  type="button"
                  onClick={() => alert("Complete todos los campos")}
                >
                  Registrarse
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
