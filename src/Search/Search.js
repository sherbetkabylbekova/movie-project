import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState("")
    const history = useHistory()
    const handleSearch = () => {
        if (search) {
            history.push(`/browse/${search}`)
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            history.push(`/browse/${search}`)
        }
    }
    return (
        <div>
            <div className="d-flex align-items-center">
                    <input className="input-group-text " placeholder="Поиск" type="text" onChange={(e) =>
                        setSearch(e.target.value)}
                           onKeyPress={handleKeyPress}/>
                    <button className="btn btn-warning mx-2" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default Search;