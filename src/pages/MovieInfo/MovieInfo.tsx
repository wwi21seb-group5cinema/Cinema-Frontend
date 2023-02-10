//import './MovieInfo.css'

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
function MovieInfo(){

    const API_URL = process.env.REACT_APP_API_URL;
    const [allMovieCards, setMovieCards] = useState<React.ReactElement[]>();
    const [MovieData,setMovieData] = useState<any[]>([]);


    function getURL(image:any)
    {
        return API_URL + "/image/get/"+image.id.toString()
    }

    const navigate = useNavigate();

    function clickHandlerMovie(currentData:any) 
        {
            console.log(MovieData)
            console.log(currentData)
            navigate("/MoviePage", {state:{MovieData:MovieData[currentData]}})
        }


    const MovieCards: React.ReactElement[] = []

    useEffect(() => {
        fetch(API_URL + "/movie/getAll")
            .then(response => response.json())
            .then(MovieData =>{
                setMovieData(MovieData);

            })
            .catch(error =>{
                console.log(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //{allMovieCards} später wieder rein tun
    //<MovieCard imageUrl={""} title={"Der große Testfilm"} description={"qhfbioqenfcopqewfmneqwpofneqw"} genre={"Action"} length={170} fsk={12} rating={9.9} start_date={14.02} end_date={17.07}/>
    function fillMovieCard()
    {
        for (let i=0; i<MovieData.length; i++) {
            MovieCards.push(<MovieCard imageUrl={MovieData[i].externalImage ? MovieData[i].image_url : getURL(MovieData[i].image)} title={MovieData[i].name} description={MovieData[i].description}
                                       genre={MovieData[i].genre} length={MovieData[i].length} fsk={MovieData[i].fsk}
                                       rating={MovieData[i].rating} start_date={MovieData[i].start_date} end_date={MovieData[i].end_date} clickHandlerMovie={clickHandlerMovie} currentMovie={i}  />)
        }
        setMovieCards(MovieCards);
    }
    useEffect( ()=>{
        fillMovieCard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[MovieData]);

    return(
        <div className="app">
            <Navbar/>
            {allMovieCards}
        </div>
    );
}
export default MovieInfo
