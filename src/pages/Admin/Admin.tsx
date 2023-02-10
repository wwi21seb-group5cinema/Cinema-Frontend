import "./Admin.css"
import Navbar from "../../components/Navbar/Navbar";
import {Button, ConfigProvider, List, theme} from "antd";
import {To, useNavigate} from "react-router-dom";

import React, {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import Cookies from "js-cookie";
const API_URL = process.env.REACT_APP_API_URL;

function Admin(){

    const [ResultList,setResultList] = useState<React.ReactElement>();
    const navigate = useNavigate();

    useEffect(()=>{
        if( !(Cookies.get("isLoggedIn") === "true")){
            navigate(-1 as To, { replace: true });
        }
        const userID = Cookies.get("userID");
        fetch(API_URL + "/user/" + userID)
            .then( response => response.json()
            ).then( data => {
                if(!(data.role === "ADMIN")){
                    navigate(-1 as To, { replace: true });
                }
            }


        ).catch(error =>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function onSearch(e:any){
        fetch(API_URL + "/movie/tmdb/getTmdb?movieName=" + e)
            .then(response => response.json())
            .then(data =>{
                const Movies:any[] = data;
                console.log(Movies);
                setResultList(
                <List
                    className = "list"
                    itemLayout="horizontal"
                    bordered={true}
                    dataSource={Movies.slice(0,5)}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button onClick={()=>{addMovie(item.id)}}>
                                    Film hinzufügen
                                </Button>
                            ]}>
                            <List.Item.Meta
                                avatar={<img alt="movieImage" className=".search_image" src={item.backdrop_path}/>}
                                title={item.title}
                                description={(item.overview.length<=400) ? item.overview : item.overview.substring(0,399)+"..."}
                            />
                        </List.Item>
                    )}
                />

                )
            })
    }

    function addMovie(id:number){
        const content = {
            "tmdbMovieId": id
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(content),
        }
        fetch(API_URL + "/movie/tmdb/addTmdb", options)
            .then(response => {
                if(response.ok){
                    alert("Film erfolgreich hinzugefügt")
                }
            })
            .catch(error =>{
                console.log(error)
            })

    }

    function addEvent(){
        navigate("/Admin/addEvent");
    }



    return(
        <div className="Admin">
            <Navbar/>
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
                        <div className="addMovie">
                            <div>
                        <h1>Film hinzufügen</h1>
                        <Search className ="searchAdmin" placeholder="Suche nach Filmen" allowClear  onSearch={onSearch} enterButton size="large"/>
                            </div>
                            {ResultList}
                        </div>
                        <div className="addEvent">
                            <Button onClick={addEvent} size="large">
                                Events hinzufügen
                            </Button>
                        </div>

            </ConfigProvider>
        </div>
    );
}
export default Admin