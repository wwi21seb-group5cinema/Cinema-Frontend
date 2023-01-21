import "./Searchbar.css"
import React, { useEffect, useState } from "react";
import { Input, ConfigProvider, theme, List, Avatar } from 'antd';
import {Link, useNavigate} from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;
function Searchbar(){
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [search,setSearch] = useState('');
    const [showResult,setShowResult] = useState(false);
    const [MovieData,setMovieData] = useState<any[]>([]);
    const { Search } = Input;
    
    useEffect(() => {
        fetch(API_URL + "/movie/getAll")
            .then(response => response.json())
            .then(movieData =>{
                setMovieData(movieData);
            })
            .catch(error =>{
                console.log(error);
            })
    }, []);

     

    function onChange(e:any){
        const searchWord = e.target.value;
        setSearch(searchWord);
        const newFilter = MovieData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredData(newFilter);

    };
    const navigate = useNavigate();

    function onSearch() {
        setShowResult(false);
        navigate('/MovieInfo',{state:{searchWord:search}});
    }

    function onKeyDown (e:any) {
        if(e.keyCode === 13){
            onSearch();
        }
        else
        {
            setShowResult(true);
        }
    }
    function getURL(image:any)
    {
        return API_URL + "/image/get/"+image.id.toString()
    }

    return(
        <div className={"searchfield"}>
            <ConfigProvider
                theme={
                    {
                        algorithm: theme.darkAlgorithm,
                        token: {
                            colorPrimary: '#61dafb',
                        }
                    }
                }
            >
            <div onKeyDown={onKeyDown} >
                <Search className ="search" placeholder="Suche nach Filmen" allowClear onChange={onChange} onSearch={onSearch} enterButton size="large"/>
            </div>
            {(filteredData.length !==0&&showResult) && (
                <div className="result">
                    <List
                        itemLayout="horizontal"
                        bordered={true}
                        dataSource={filteredData.slice(0,5)}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link className="more" to="/MovieInfo" state={{props: item.id}}>
                                        Mehr
                                    </Link>]}>
                                <List.Item.Meta
                                    avatar={<img alt="movieImage" className=".search_image" src={item.externalImage ? item.image_url : getURL(item.image)} />}
                                    title={<Link className="search_link" to="/MovieInfo" state={{props: item.id}}> <li>{item.name}</li> </Link>}
                                    description={(item.description.length<=400) ? item.description : item.description.substring(0,399)+"..."}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                )}

        </ConfigProvider>
            </div>
    );
}
export default Searchbar;