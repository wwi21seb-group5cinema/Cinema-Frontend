import "./Searchbar.css"
function Searchbar(){
    function SearchMovies(){
       const searchbar:any = document.getElementById('inputText');
       const text:string|null = searchbar.value;
       window.alert(text );
    }
    function KeyDownHandler(e:any){
        if(e.keyCode === 13){
            SearchMovies();
        }
    }

    return(
            <div className="searchbar" onKeyDown={KeyDownHandler}>
                <input id="inputText"
                    placeholder="Suche nach Filmen"
                />
                <img
                    src="https://via.placeholder.com/400"
                    alt="search"
                    onClick={SearchMovies}
                />
            </div>
    );
}
export default Searchbar