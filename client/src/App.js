import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Detail from "./components/Details";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setUser } from "./redux/actions";
import { auth } from "./fb";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  let user = useSelector(state => state.currentUser)
  return (
    <div className="App">
      <Routes>

        <Route path='/register' exact element={<Register/>}/>        
        <Route path='/login' exact element={<Login/>}/>        
        <Route path='/profile' exact element={<Profile/>}/>        
        <Route path='/' exact element={<Home/>}/>        
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/bebida/:id" element={<Detail />} />

      </Routes>
    </div>
  );
}

// base
export default App;
