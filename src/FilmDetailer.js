import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";


const FilmDetailer = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [movies, setMovies] = useState([])
    const params = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?&language=ru&api_key=${key}`)
            .then(({data}) => setMovies(data.results))
    }, [params.id])
    return (
        <div className='row'>
            {
                movies.map(el => (
                    <div className="col-md-3 col-sm-3 mb-3" key={el.id}>
                        <Link to={`/film/${el.id}`}>
                            <div className='box-movies'>
                                <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt=""
                                     className='poster'/>
                                <h4 className='text-warning my-2'>{el.title}</h4>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default FilmDetailer;