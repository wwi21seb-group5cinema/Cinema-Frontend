import "./Searchbar.css"
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useEffect, useState } from "react";
import { Input, Space, ConfigProvider, theme, List } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import MovieData from "./MovieListTest.json"

const API_URL = process.env.REACT_APP_API_URL;
function Searchbar(){
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [search,setSearch] = useState('');
    //const [MovieData,setMovieData] = useState<any[]>([]);
    const { Search } = Input;



    function onChange(e:any){
        const searchWord = e.target.value;
        setSearch(searchWord);
        const newFilter = MovieData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const onSearch = (value: string) => console.log(value);

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
            <div >
                    <Search className ="search" placeholder="Suche nach Filmen" allowClear onChange={onChange} onSearch={onSearch} enterButton size="large"
                    />

            </div>
            {filteredData.length !=0 && (
                <div className="result">
                    <List
                        itemLayout="horizontal"
                        bordered={true}
                        loadMore
                        dataSource={filteredData}
                        renderItem={(item) => (
                            <List.Item className={"listitem"}>
                                <List.Item.Meta
                                    //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={item.description}
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