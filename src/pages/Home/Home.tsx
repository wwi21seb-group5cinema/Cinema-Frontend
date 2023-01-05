
import Movie from "../../components/Movie/Movie";
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
function Home(){


    return(
        <div className="app">
            <Navbar/>
                <MovieCarousel/>
                <Movie imageUrl={""} title={""} description={""}/>
                <Movie imageUrl={""} title={""} description={""}/>
                <Movie imageUrl={""} title={""} description={""}/>
            </div>



    );
}
export default Home;