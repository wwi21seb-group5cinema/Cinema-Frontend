


function Movie(){

    function clickHandler(){
        window.location.href = '/MovieInfo'
    }

    return (
        <div className="movie" >
            <div>
                <p>2010</p>
            </div>

            <div>
                <img src="https://via.placeholder.com/400" alt={"Title"} onClick={clickHandler} />
            </div>

            <div>
                <h3>{"titel"}</h3>
            </div>
        </div>
    );
}
export default Movie;