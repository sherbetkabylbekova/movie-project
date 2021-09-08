import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";


const Browse = () => {
    const [search, setSearch] = useState([])
    const [error, setError] = useState("")
    const history = useHistory()
    const params = useParams()
    const key = '6f19f87e3380315b9573c4270bfc863c'
    useEffect(() => {
            axios(`https://api.themoviedb.org/3/search/multi?query=${params.name}&api_key=${key}&language=ru&page=1&include_adult=false`)
                .then(({data}) => {
                    if (data.results) {
                        setSearch(data.results)
                    } else {
                        setError("There is no such film")
                    }
                })
        }, [params.name]
    )
    return (
        <div className="container py-5">
            <div className="row my-2">
                {
                    search.map(el => (
                        <div className="col-md-3 col-sm-3 mb-3">
                            <Link to={`/film/${el.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}  alt="" width={250}/>
                                <h4> {el.title}</h4>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <button className="btn btn-info" onClick={() => history.goBack()}>Back</button>
            <h3 className="error">{error}</h3>
        </div>
    );
};

export default Browse;