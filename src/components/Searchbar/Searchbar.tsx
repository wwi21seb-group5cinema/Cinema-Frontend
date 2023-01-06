import "./Searchbar.css"
import { AiOutlineSearch } from 'react-icons/ai';
import {useState} from "react";
function Searchbar(){

    const [search,setSearch] = useState('');

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
                <input value={search} placeholder="Suche nach Filmen" onChange={(e)=>setSearch(e.target.value)}/>
                <h1 className="searchIcon" onClick={SearchMovies}>
                    <AiOutlineSearch/>
                </h1>
            </div>
    );
}
export default Searchbar