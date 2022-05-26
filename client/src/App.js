import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from "./components/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAdmin, setUser } from "./redux/actions";
import { auth } from "./fb";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' exact element={<Register/>}/>        
        <Route path='/login' exact element={<Login/>}/>        
        <Route path='/profile' exact element={<Profile/>}/>        
        <Route path='/' exact element={<Home/>}/>        
      </Routes>
    </div>
  );
}

// base
export default App