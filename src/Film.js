import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory, Link} from 'react-router-dom'
import avatar from "./Images/avatar-anonymous-300x300.png";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Trailers from "./Trailers";


const Film = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [film, setFilm] = useState({})
    const [credits, setCredits] = useState([])
    const [video, setVideo] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const params = useParams()
    const history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios(`https://api.themoviedb.org/3/movie/${params.id}?&language=ru&api_key=${key}`)
            setFilm(data)
            setIsLoading(false)
            const {data: {cast}} = await axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&language=ru&api_key=${key}`)
            setCredits(cast)
            const {data: {results}} = await axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${key}&language=ru`)
            setVideo(results)

        }
        fetchData()
    }, [params.id])
    if (isloading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <>
            <div className='background'
                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.backdrop_path}`}}/>
            <div className="container py-5  ">
                <div className="row minus-margin">
                    <div className="col-md-3 col-sm-3 mb-3">
                        <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt="" className="film-img"/>
                    </div>
                    <div className="col-md-9 col-sm-9 mb-3">
                        <h3 className="text-center">{film.title}</h3>
                        <p>{film.overview}</p>
                        <h6>Дата выхода: {film.release_date}</h6>
                        <h6>Длительность: {film.runtime} мин</h6>
                        <h6>Рейтинг: {film.vote_average}</h6>
                        <h6>Бюджет: {film.budget.toLocaleString()}$</h6>
                        <h6>Язык: {film.language}</h6>
                        <h6>Сборы: {film.revenue.toLocaleString()}$</h6>
                        <h6>Страна:{film.production_countries.map(country => country.name, []).join()} </h6>
                        <h6>Жанр: {film.genres.map((el) => el.name, []).join()} </h6>
                    </div>
                    {
                        !isloading && <OwlCarousel className="owl-theme my-4" margin={10} items={6}>
                            {
                                credits.slice(0, 15).map(user =>
                                    <div key={user.id}>
                                        <Link to={`/credits/${user.id}`}>
                                            <img className="person-img"
                                                 src={user.profile_path ? `https://image.tmdb.org/t/p/w500${user.profile_path}` : avatar}
                                                 alt=""/>
                                            <h6>{user.name}</h6>
                                        </Link>
                                    </div>
                                )
                            }
                            <div>
                                <Link to={`/acters/${film.id}`} className="btn btn-info" yarn add>
                                    See more
                                </Link>
                            </div>
                        </OwlCarousel>
                    }
                    <div className="row my-4">
                        {
                            video.map(el =>
                                <div className="col-md-6 col-sm-6 mb-3" key={el.key}>
                                    <Trailers key={el.key} id={el.key} filmId={film.id}/>
                                </div>
                            )
                        }
                    </div>
                </div>
                <button className="btn btn-info" onClick={() => history.goBack()}>Back</button>
            </div>
        </>

    );
};

export default Film;