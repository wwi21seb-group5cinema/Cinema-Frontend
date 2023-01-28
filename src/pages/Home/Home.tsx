
import Movie from "../../components/Movie/Movie";

import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
function Home(){
    const navigate = useNavigate();
   
    function clickHandlerMovie(currentData:any) 
        {
            navigate("/MoviePage", {state:{MovieData:MovieData[currentData]}})
        };

    const [allMovies, setMovies] = useState<React.ReactElement[]>([]);
    const [MovieData,setMovieData] = useState<any[]>([]);

    const Movies: React.ReactElement[] = []

    useEffect(() => {
        fetch(API_URL + "/movie/getAll")
            .then(response => response.json())
            .then(MovieData =>{
                setMovieData(MovieData);
            })
            .catch(error =>{
                console.log(error);
            })
    }, []);

    async function fetchEventData(){
        for (let i=0; i<MovieData.length; i++) {
            try {
                const response = await fetch(API_URL + "/event/get?movieId=" + MovieData[i].id)
                if(!response.ok){
                    console.log("Fehler: " + response.ok);
                }
                const eventData = await response.json();
                
                Movies.push(<Movie imageUrl={MovieData[i].externalImage ? MovieData[i].image_url : getURL(MovieData[i].image)} title={MovieData[i].name} description={MovieData[i].description}
                events={eventData} genre={MovieData[i].genre} length={MovieData[i].length} fsk={MovieData[i].fsk}  clickHandlerMovie={clickHandlerMovie} currentMovie={i}   />);
            }
            catch(error){
                console.log(error);
            }
        }
        setMovies(Movies);
    }

    useEffect( ()=>{
        fetchEventData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[MovieData]);

    function getURL(image:any)
    {
        return API_URL + "/image/get/"+image.id.toString()
    }

    
    
 
    return(
        <div className="app">
            <Navbar/>
            <MovieCarousel imageUrl={""} title={""}/>
            {allMovies}
            
        </div>



    );
}
export default Home;