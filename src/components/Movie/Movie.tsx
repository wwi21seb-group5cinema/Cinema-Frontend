
import './Movie.css'

function Movie(){

    function clickHandlerMovie(){
        window.location.href = '/MovieInfo'
    }
    function clickHandlerEvent(){
        window.location.href = '/Booking'
    }

    return (
        <div className="container">
            <div className="row" >
                <div className="movie">

                    <div>
                        <p>2010</p>
                    </div>

                     <div>
                        <img src="https://via.placeholder.com/400" alt={"Title"} onClick={clickHandlerMovie} />
                    </div>

                    <div>
                        <h3>{"titel"}</h3>
                    </div>
                </div>
            </div>
                <div className="row">
                    <div className="events">
                        <ul>
                            <li onClick={clickHandlerEvent}>
                                Veranstaltung 15.12.22
                            </li>
                            <li onClick={clickHandlerEvent}>
                                Veranstaltung 17.12.22
                            </li>
                        </ul>

                    </div>


                </div>


        </div>
    );
}
export default Movie;