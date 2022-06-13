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
import "./Register.css";

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
  async function errorValidate(error) {
    setError(null);
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      setError("Ya existe un usuario con este mail");
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
        .catch((err) => errorValidate(err.message));
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

  return (
    <div className="registro-body">
      {loading && !isLoged ? (
        <Loading />
      ) : (
        <div className="registro-cont">
          <div>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <div className="registro-form">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>

              {nameError && <span>{nameError}</span>}

              <div className="registro-form">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Enter your surname"
                  onChange={handleChange}
                />
              </div>

              {surnameError && (
                <span className="register-span">{surnameError}</span>
              )}

              <div className="registro-form">
                <label htmlFor="telefono">Celular</label>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Enter your phone number"
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

              {birthError && <span>{birthError}</span>}

              <div className="registro-form">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              {emailError && <span>{emailError}</span>}

              <div className="registro-form">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              {passwordError && <span>{passwordError}</span>}

              <div className="registro-form">
                <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                />
              </div>

              {confirmPasswordError && <span>{confirmPasswordError}</span>}

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
                <button>Registrarse</button>
              ) : (
                <button
                  type="button"
                  onClick={() => alert("Complete todos los campos")}
                >
                  Registrarse
                </button>
              )}

              <div class="text-center">
                <p>or sign up with:</p>
                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
