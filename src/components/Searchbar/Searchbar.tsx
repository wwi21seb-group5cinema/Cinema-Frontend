import "./Searchbar.css"
import { AiOutlineSearch } from 'react-icons/ai';
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
                <h1 className="searchIcon" onClick={SearchMovies}>
                    <AiOutlineSearch/>
                </h1>
            </div>
    );
}
export default Searchbar