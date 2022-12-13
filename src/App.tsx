import React from 'react';
import './App.css';
import Home from "./pages/Home/Home";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Booking from "./pages/Booking/Booking";
import Admin from "./pages/Admin/Admin";
import {BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="MovieInfo" element={<MovieInfo/>}/>
              <Route path="Booking" element={<Booking/>}/>
              <Route path="Admin" element={<Admin/>}/>
          </Routes>
      </BrowserRouter>


  );
}

export default App;
