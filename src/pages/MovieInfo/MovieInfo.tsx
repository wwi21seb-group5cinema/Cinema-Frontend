//import './MovieInfo.css'
import {Card} from "antd";
import { useState, useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import MovieCard from "../../components/MovieCard/MovieCard";
import Navbar from "../../components/Navbar/Navbar";
function MovieInfo(){

    

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await fetch('http://localhost:8082/v1/movie/getAll',
            {mode: 'no-cors'});
            if (!response.ok) {
            throw new Error();
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    return(
        <div className="app">
        <Navbar/>
        <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"}/>
        <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"}/>
        <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"}/>
        <MovieCard imageUrl={""} title={"Avatar 2"} description={"Cool film bla bla"}/>
        </div>
    );
}
export default MovieInfo

