import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Detail from "./components/Details";
import ShoppingCart from "./components/ShoppingCart";
import Landing from "./components/Landing/Landing";
import "@fontsource/montserrat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />

        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/bebida/:id" element={<Detail />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

// base
export default App;
