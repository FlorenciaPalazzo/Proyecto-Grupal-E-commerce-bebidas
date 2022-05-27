import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Detail from "./components/Details";
import User from "./components/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>     
        <Route path='/admin' element={<AdminPanel/>}/>  
        <Route path='/bebida/:id' element={<Detail/>}/> 
        <Route path="/user" exact element={<User/>} />
      </Routes>
    </div>
  );
}

// base
export default App