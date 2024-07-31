import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Login from './pages/Login';
import Section from './pages/Section'
import Kitchen from './pages/Kitchen';
import Dashboard from './pages/Dashboard';
import Reception from './pages/Reception';
import Bathroom from './pages/Bathroom';
import Dining from './pages/Dining';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Routes>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/sections' element={<Section/>}></Route>
        <Route exact path='/kitchen' element={<Kitchen/>}></Route>
        <Route exact path='/reception' element={<Reception/>}></Route>
        <Route exact path='/bathroom' element={<Bathroom/>}></Route>
        <Route exact path='/dining' element={<Dining/>}></Route>

      </Routes>
    </Router>
    
  );
}

export default App;
