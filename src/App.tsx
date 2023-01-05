import React from 'react';
import './App.css';
import Home from "./pages/Home/Home";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Booking from "./pages/Booking/Booking";
import Admin from "./pages/Admin/Admin";
import Login from "./pages//Login/Login";
import {BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Movies" element={<MovieInfo/>}/>
              <Route path="Booking" element={<Booking/>}/>
              <Route path="Admin" element={<Admin/>}/>
              <Route path="Login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>


  );
}

export default App;
