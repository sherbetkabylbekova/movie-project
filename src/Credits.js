import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import poster from './Images/poster.png'
import avatar from "./Images/avatar-anonymous-300x300.png"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const Credits = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [user, setUser] = useState({})
    const [isloading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    const [films, setFilms] = useState([])
    const params = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&language=ru&api_key=${key}`)
            .then(({data}) => setUser(data))
        setIsLoading(false)
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?&language=ru&api_key=${key}`)
            .then(({data: {cast}}) => {
                setFilms(cast)
                setLoading(false)
            })
    }, [params.id])
    const moviesbyDate = films.filter((el) => el.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    console.log(moviesbyDate)
    if (isloading || loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    return (
        <div className="container py-5">
            <div className="row my-5">
                <div className="col-md-3 col-sm-3 mb-3">
                    <img src={user.profile_path ? `https://image.tmdb.org/t/p/w200${user.profile_path}` : avatar}
                         alt=""/>
                    <h4>Персональная информация</h4>
                    <h6> {user.birthday}</h6>
                    <h6>Пол: {user.gender === 2 ? "мужчина" : "женщина"}</h6>
                    <h6>Место рождения: {user.place_of_birth}</h6>
                    <h6>Популярность: {user.popularity}</h6>
                    <button className="btn btn-info" onClick={() => history.goBack()}>Back</button>
                </div>
                <div className="col-md-9 col-sm-9 mb-3">
                    <h3 className="text-center">{user.name} </h3>
                    <p>{user.biography}</p>
                    <div className="row my-4">
                        <h3>Известность за</h3>
                        {
                            films.slice(0, 8).map(film =>
                                <div key={film.id} className="col-md-3 col-sm-3 mb-3">
                                    <Link to={`/film/${film.id}`}>
                                        <img className="credits-img" src={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : poster}
                                             alt=""/>
                                        <h4>{film.title}</h4>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <h3>Актерское исскуство </h3>
                    {!loading &&
                         <OwlCarousel className="owl-theme my-4" margin={10} items={6}>
                            {
                                moviesbyDate.map(el =>
                                    <Link to={`/film/${el.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt=""/>
                                        <h5>{el.title}</h5>
                                    </Link>
                                )
                            }
                        </OwlCarousel>
                    }
                </div>
            </div>
        </div>
    );
};

export default Credits;