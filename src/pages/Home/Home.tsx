
import Movie from "../../components/Movie/Movie";
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useEffect, useState } from "react";
function Home(){

    const [allMovies, setMovies] = useState<React.ReactElement[]>();

    const Movies: React.ReactElement[] = []

    useEffect(() => {
        fetch('http://localhost:8082/v1/movie/getAll')
        .then(response => response.json())
        .then(data =>{
           for (let i=0; i<data.length; i++) {
            fetch('http://localhost:8082/v1/event/get?movieId=' + data[i].id)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                Movies.push(<Movie imageUrl={""} title={data[i].name} description={"Cool film bla bla"} events={data} />)
            })
            
                 
          }
          setMovies(Movies);
       })
        .catch(error =>{
           console.log(error);
       })
   }, []);


    return(
        <div className="app">
            <Navbar/>
                <MovieCarousel imageUrl={""} title={""}/>
                {allMovies}
            </div>



    );
}
export default Home;