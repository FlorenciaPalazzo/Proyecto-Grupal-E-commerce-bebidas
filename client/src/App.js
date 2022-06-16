// import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import Detail from "./components/Details";
import ShoppingCart from "./components/ShoppingCart";
import Review from "./components/Review";
import EditProfile from "./components/Profile/editContainer";
import "@fontsource/montserrat";
import { Checkout } from "./components/Checkout";
import { FeedBack } from "./components/FeedBack";
import { Favoritos } from "./components/Favoritos";
import Offers from "./components/Off/Offers";
import Historial from "./components/Historial";
import ResetPassword from "./components/Auth/ResetPassword";
import EditForm from "./components/Admin/ProductForm";
import { AdminReview } from "./components/Review/AdminReview";
import { AdminRevDetail } from "./components/Review/AdminRevDetail";
import { AdminEmailUser } from "./components/Review/AdminEmailUser";
import PutReview from "./components/Profile/PutReview";
import ViewProducts from "./components/Admin/ViewProducts";
import ProductsStats from "./components/Admin/ProductsStats";
import ViewUsers from "./components/ViewUsers";
import { About } from "./components/About";
import CreateProducts from "./components/Admin/CreateProducts";
import MissingRoute from "./components/MissingRoute";
import { AdminStats } from "./components/Admin/AdminStats";
import ContactForm from "./components/Contact/ContactRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<MissingRoute />} />
        <Route path="/" exact element={<Home />} />

        <Route path="/admin" exact element={<AdminStats />} /> {/**LISTORTI */}
        <Route path="/admin/products/edit/:id" exact element={<EditForm />} /> {/**revisar ID  */}
        <Route path="/adminreview" exact element={<AdminReview />} />
        <Route path="/adminreview/:id" exact element={<AdminRevDetail />} /> {/**revisar ID  */}
        <Route path="/adminemail/:id" exact element={<AdminEmailUser />} /> 
        <Route path="/admin/products" exact element={<ViewProducts />} />
        <Route path="/admin/products/stats" exact element={<ProductsStats />} />
        <Route path="/admin/usuarios" exact element={<ViewUsers />} />
        <Route
          path="/admin/products/create" 
          exact
          element={<CreateProducts />} />
        <Route path="/cart" exact element={<ShoppingCart />} /> 
        <Route path="/login" exact element={<Login />} /> 
        <Route path="/login/reset" exact element={<ResetPassword />} /> {/**revisar boton de cambiar contraseña*/}
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/profile/edit" exact element={<EditProfile />} />
        <Route path="/contact" exact element={<ContactForm />} /> {/** la tiene recontra adentro*/}
        <Route path="/register" exact element={<Register />} /> 
        <Route path="/bebida/:id" exact element={<Detail />} />  {/**revisar Id */}
        <Route path="/checkout/:id" exact element={<Checkout />} /> {/**revisar Id */}
        <Route path="/offers" exact element={<Offers />} /> 
        <Route path="/feedback" exact element={<FeedBack />} /> 
        <Route path="/review/:id" exact element={<Review />} />
        <Route path="/review" exact element={<Review />} /> 
        <Route path="/favoritos/:id_user" exact element={<Favoritos />} /> 
        <Route path="/historial/:id" exact element={<Historial />} /> 
        <Route path="/putreview/:id" exact element={<PutReview />} /> {/**revisar siendo admin */}
        <Route path="/about" exact element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
