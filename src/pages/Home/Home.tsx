
import Movie from "../../components/Movie/Movie";
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
function Home(){


    return(
        <div className="app">
            <Navbar/>
                <h1>Veranstaltungen</h1>
                <Movie/>
                <Movie/>
            </div>



    );
}
export default Home;