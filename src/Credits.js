import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import poster from './Images/poster.png'
import avatar from "./Images/avatar-anonymous-300x300.png"

const Credits = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [user, setUser] = useState({})
    const [isloading, setIsLoading] = useState(true)
    const [films, setFilms] = useState([])
    const params = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&language=ru&api_key=${key}`)
            .then(({data}) => setUser(data))
        setIsLoading(false)
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?&language=ru&api_key=${key}`)
            .then(({data: {cast}}) => setFilms(cast))
    }, [params.id])
    if (isloading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-6 col-sm-6 mb-3">
                    <img src={user.profile_path ? `https://image.tmdb.org/t/p/w500${user.profile_path}` : avatar}
                         alt=""/>
                </div>
                <div className="col-md-6 col-sm-6 mb-3">
                    <h3 className="text-success text-center">{user.name} </h3>
                    <h6>Дата рождение: {user.birthday}</h6>
                    <h6>Пол: {user.gender === 2 ? "мужчина" : "женщина"}</h6>
                    <h6>Место рождение: {user.place_of_birth}</h6>
                    <h6>Популярность: {user.popularity}</h6>
                    <p>Биография: {user.biography}</p>
                    <button className="btn btn-info" onClick={() => history.goBack()}>Back</button>


                </div>
            </div>
            <div className="row my-4">
                {
                    films.slice(0, 8).map(film =>
                        <div key={film.id} className="col-md-3 col-sm-3 mb-3">
                            <img className="credits-img"
                                 src={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : poster}
                                 alt=""/>
                            <h4>{film.title}</h4>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Credits;