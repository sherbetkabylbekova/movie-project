import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'

const MainPage = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=ru&api_key=${key}`)
            .then(({data}) => setMovies(data.results))
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    return (
        <div className="container">
            {
                Array(6).fill(0).map((el, index) =>
                    <button className={`btn btn-info mx-1 ${page === index + 1 && "btn btn-success"}`} key={index + 1}
                            onClick={() => handlePage(index + 1)}>{index + 1}</button>
                )
            }
            <div className="row my-4">
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
        </div>
    );
};

export default MainPage;