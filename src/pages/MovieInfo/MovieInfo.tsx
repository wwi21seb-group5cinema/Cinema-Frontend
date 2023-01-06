//import './MovieInfo.css'
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
function MovieInfo(){

    function clickHandler(){
        window.location.href = '/Booking'
    }

    return(
        <div className="infoText">
            <p>Seite für Informationen über den Film und die Sitzplatzauswahl</p>
            <ul>
                <li onClick={clickHandler}>
                    Veranstaltung 15.12.22
                </li>
                <li onClick={clickHandler}>
                    Veranstaltung 17.12.22
                </li>
                <li onClick={clickHandler}>
                    Veranstaltung 30.12.22
                </li>
                <li onClick={clickHandler}>
                    Veranstaltung 17.01.22
                </li>
            </ul>
        </div>
    );
}
export default MovieInfo