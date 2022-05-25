import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Contact from "./components/Contact";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>        
      </Routes>
    </div>
  );
}

// base
export default App