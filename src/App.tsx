import React from 'react';
import './App.css';
import Home from "./pages/Home/Home";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Booking from "./pages/Booking/Booking";
import BookingConfirmation from "./pages/BookingConfirmation/BookingConfirmation";
import Admin from "./pages/Admin/Admin";
import Login from "./pages//Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import {HashRouter, Routes, Route} from 'react-router-dom';
import MoviePage from './pages/MoviePage/MoviePage';


function App() {
  return (
      <HashRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="MovieInfo" element={<MovieInfo/>}/>
              <Route path="Booking" element={<Booking/>}/>
              <Route path="BookingConfirmation" element={<BookingConfirmation/>}/>
              <Route path="Admin" element={<Admin/>}/>
              <Route path="Login" element={<Login/>}/>
              <Route path="Register" element={<Register/>}/>
              <Route path="Account" element={<Account/>}/>
              <Route path="MoviePage" element={<MoviePage/>}/>
          </Routes>
      </HashRouter>
  );
}

export default App;
