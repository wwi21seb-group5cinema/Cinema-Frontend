import Navbar from "../../components/Navbar/Navbar";
import Movie from "../../components/Movie/Movie";
import "./Home.css"
function Home(){
    return(
        <div className="app">

            <div className="search">
               <Navbar/>
            </div>
            <div className="container">

            <div>
                <Movie/>
                <Movie/>

            </div>
        </div>

        </div>

    );
}
export default Home;