import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword,  } from "firebase/auth";
import { auth } from "../../fb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setUser, setMessage } from "../../redux/actions";
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
      if(!user) {
          console.log(currentState);
        return;
        }
      dispatch(isAdmin(user.email));
      dispatch(setUser({ ...user }));
      navigate("/home");
    } catch (error) {
        
    }
  }
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
          <h1>Login</h1>
          <div>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />

              <button>Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
