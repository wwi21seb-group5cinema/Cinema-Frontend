import "./Navbar.css"
function Navbar(){
    function SearchMovies(){
       const searchbar:any = document.getElementById('searchbar');
       const text:string|null = searchbar.value;
       window.alert(text );
    }
    function KeyDownHandler(e:any){
        if(e.keyCode === 13){
            SearchMovies();
        }
    }

    return(
        <div className="navBar">
            <div className="search" onKeyDown={KeyDownHandler}>
                <input id="searchbar"
                    placeholder="Suche nach Filmen"
                />
                <img
                    src="https://via.placeholder.com/400"
                    alt="search"
                    onClick={SearchMovies}
                />
            </div>

        </div>
    );
}
export default Navbar