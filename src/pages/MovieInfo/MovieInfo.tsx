//import './MovieInfo.css'

import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
function MovieInfo(){

    const API_URL = process.env.REACT_APP_API_URL;
    const [allMovieCards, setMovieCards] = useState<React.ReactElement[]>();



    const MovieCards: React.ReactElement[] = []

    useEffect(() => {
        fetch(API_URL + "/movie/getAll")
            .then(response => response.json())
            .then(data =>{
                for (let i=0; i<data.length; i++) {
                    console.log(data[i].genre);
                    MovieCards.push(<MovieCard imageUrl={""} title={data[i].name} description={"Cool film bla bla"} />)
                }
                setMovieCards(MovieCards);
            })
            .catch(error =>{
                console.log(error);
            })
    }, []);

    return(
        <div className="app">
            <Navbar/>

            {allMovieCards}

        </div>
    );
}
export default MovieInfo
