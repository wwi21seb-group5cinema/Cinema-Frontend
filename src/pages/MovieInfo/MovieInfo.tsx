//import './MovieInfo.css'

import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
function MovieInfo(){

  
    const [allMovieCards, setMovieCards] = useState<React.ReactElement[]>();

 

    const MovieCards: React.ReactElement[] = []

    useEffect(() => {
         fetch('http://localhost:8082/v1/movie/getAll')
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

          {/* 
           <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"} />
            <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"} />
            <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"} />
            <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"} />
         */}
        </div>
    );
}
export default MovieInfo

