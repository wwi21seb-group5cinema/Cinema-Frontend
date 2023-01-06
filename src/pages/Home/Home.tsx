
import Movie from "../../components/Movie/Movie";
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
function Home(){


    return(
        <div className="app">
            <Navbar/>
                <MovieCarousel imageUrl={""} title={""}/>
                <Movie imageUrl={""} title={""} description={""}/>
                <Movie imageUrl={""} title={""} description={""}/>
                <Movie imageUrl={""} title={""} description={""}/>
            </div>



    );
}
export default Home;