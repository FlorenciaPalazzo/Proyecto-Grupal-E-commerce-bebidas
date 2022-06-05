import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../fb";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setUser, setMessage, createUser } from "../../redux/actions";
import Loading from "../Loading";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const loading = useSelector((state) => state.isLoading);
  const isLoged = useSelector((state) => state.isLoged);
  const currentState = useSelector((state) => state);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      let user = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      )
        .then((res) => res.user)
        .catch((err) => setError(err.message));
      console.log(!user);
      if (!user) {
        console.log(currentState);
        return;
      }
      dispatch(isAdmin(user.email));
      dispatch(setUser({ ...user }));
      navigate("/home");
    } catch (error) {}
  }

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
            nombre: userCred.displayName || "Usuario Google",
            email: userCred.email,
            isAdmin: userCred.email === process.env.REACT_APP_ADMIN_EMAIL,
            isVerified: userCred.emailVerified
          })
        );
        return userCred;
      })
      .then((user) => {
        console.log("seteoooo");
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }

//   let search = window.location.search;
//   let params = new URLSearchParams(search);
//   let foo = params.get("valen");
//   console.log(foo)
  
  const user = useSelector((state) => state.currentUser);
  useEffect(() => {
    isLoged && navigate("/home");
  }, [isLoged]);

  return (
    <div>
      {loading && !isLoged ? (
        <Loading />
      ) : (
        <div>
          <Link to="/home">
          <button className="button">Home</button>
          </Link>
          <h1 className="forms-title">Login</h1>
          <div className="forms">
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />

              <button>Login</button>
            </form>
            <button onClick={googleHandleSubmit}>SignUp con Google</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
