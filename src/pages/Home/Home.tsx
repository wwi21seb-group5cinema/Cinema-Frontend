
import Movie from "../../components/Movie/Movie";

import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import React, { useEffect, useState } from "react";
import CarouselInput from "../../components/CarouselInput/CarouselInput";

const API_URL = process.env.REACT_APP_API_URL;
function Home(){

    const [allMovies, setMovies] = useState<React.ReactElement[]>([]);
    const [MovieData,setMovieData] = useState<any[]>([]);
    const [caroselData, setCarosel] = useState<React.ReactElement[]>([]);

    const Movies: React.ReactElement[] = []
    const carousel: React.ReactElement[] = []
    const topEventMovie: any[] = []


    useEffect(() => {
        fetch(API_URL + "/movie/getAll")
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
                const response = await fetch(API_URL + "/event/get?movieId=" + MovieData[i].id)
                if(!response.ok){
                    console.log("Fehler: " + response.ok);
                }
                const eventData = await response.json();
                console.log(eventData);
                Movies.push(<Movie imageUrl={""} title={MovieData[i].name} description={"Cool film bla bla"}
                                   events={eventData}/>);
            }
            catch(error){
                console.log(error);
            }
        }
        setMovies(Movies);
    }

    function getDatum() {
        const heute = new Date();
        const day = heute.getDate()<10 ? "0"+heute.getDate() : heute.getDate()
        const month = heute.getMonth()<9 ? "0"+(heute.getMonth()+1) : ""+(heute.getMonth()+1)
        return day+"-"+month+"-"+heute.getFullYear()+" 00:00"
    }

    function getDatenextWeek() {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate()+7)
        const day = nextWeek.getDate()<10 ? "0"+nextWeek.getDate() : nextWeek.getDate()
        const month = nextWeek.getMonth()<9 ? "0"+(nextWeek.getMonth()+1) : ""+(nextWeek.getMonth()+1)
        return day+"-"+month+"-"+nextWeek.getFullYear()+" 00:00"
    }

    async function fetchCarouselData(){
        for (let i=0; i<MovieData.length; i++) {
            try {
                const response = await fetch(API_URL + "/event/get?movieId=" + MovieData[i].id+"&startDate="+getDatum()+"&endDate="+getDatenextWeek())
                if(!response.ok){
                    console.log("FEHLER")
                    console.log("Fehler: " + response.ok);
                }
                const eventData = await response.json();
                console.log(eventData);
                topEventMovie.push(MovieData[i]);
            }
            catch(error){
                console.log(error);
            }
        }
        while(topEventMovie.length > 5)
        {
            let lowest = 100.0;
            let lowestIndex=-1;
            for(let i=0; i<topEventMovie.length; i++)
            {
                if(topEventMovie[i].rating<lowest)
                {
                    lowest = topEventMovie[i];
                    lowestIndex=i;
                }
            }
            topEventMovie.splice(lowestIndex, 1);
        }
        for(let i=0; i<topEventMovie.length; i++)
        {
            console.log("FOR")
            carousel.push(<CarouselInput imageUrl={topEventMovie[i].externalImage ? topEventMovie[i].image_url : getURL(topEventMovie[i].image)} title={topEventMovie[i].name} description={topEventMovie[i].description}/>);

        }
        setCarosel(carousel);
    }
    function getURL(image:any)
    {
        return API_URL + "/image/get/"+image.id.toString()
    }

    useEffect( ()=>{
        fetchEventData();
        fetchCarouselData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[MovieData]);


    return(
        <div className="app">
            <Navbar/>
            <MovieCarousel Movies={caroselData}/>
            {allMovies}
        </div>



    );
}
export default Home;