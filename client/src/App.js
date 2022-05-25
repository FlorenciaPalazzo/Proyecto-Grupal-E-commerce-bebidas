import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>     
        <Route path='/admin' element={<AdminPanel/>}/>   
      </Routes>
    </div>
  );
}

// base
export default App