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
import { Checkout } from "./components/Checkout";
import { FeedBack } from "./components/FeedBack";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/cart" exact element={<ShoppingCart />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/admin" exact element={<AdminPanel />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/bebida/:id" exact element={<Detail />} />
        <Route path="/checkout" exact element={<Checkout />} />
        <Route path="/feedback" exact element={<FeedBack />} />
      </Routes>
    </div>
  );
}

// base
export default App;
