
import Movie from "../../components/Movie/Movie";

import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import React, { useEffect, useState } from "react";
function Home(){

    const [allMovies, setMovies] = useState<React.ReactElement[]>([]);
    const [MovieData,setMovieData] = useState<any[]>([]);

    const Movies: React.ReactElement[] = []

    useEffect(() => {
        fetch('http://localhost:8082/v1/movie/getAll')
            .then(response => response.json())
            .then(movieData =>{
                setMovieData(movieData);
            })
            .catch(error =>{
                console.log(error);
            })
    }, []);

    async function fetchEventData(){
        for (let i=0; i<MovieData.length; i++) {
            try {
                const response = await fetch('http://localhost:8082/v1/event/get?movieId=' + MovieData[i].id)
                if(!response.ok){
                    console.log("error");
                }
                const eventData = await response.json();
                console.log(eventData);
                Movies.push(<Movie imageUrl={""} title={MovieData[i].name} description={"Cool film bla bla"}
                                   events={eventData}/>);
            }
            catch{
                console.log("error");
            }
        }
        setMovies(Movies);
    }

    useEffect( ()=>{
        fetchEventData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[MovieData]);


    return(
        <div className="app">
            <Navbar/>
            <MovieCarousel imageUrl={""} title={""}/>
            {allMovies}
        </div>



    );
}
export default Home;