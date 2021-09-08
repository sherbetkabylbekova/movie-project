import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import poster from "./Images/poster.png";
import background from "./Images/cinema.jpg"
import Search from "./Search/Search";

const MainPage = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [page, setPage] = useState(1)
    const [isloading, setIsLoading] = useState(true)
    const [popularMovie, setPopularMovie] = useState([])
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=ru&api_key=${key}`)
            .then(({data}) => setMovies(data.results))
        axios(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ru&page=1`)
            .then(({data}) => {
                setPopularMovie(data.results)
                setIsLoading(false)
            })
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    if (isloading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    } else {
        return (
            <>
                <div className="hero info" style={{backgroundImage: `url(${background})`}}>
                   <div>
                       <div>
                           <h1>Добро пожаловать</h1>
                           <h5>Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h5>
                       </div>
                       <div><Search/></div>
                   </div>
                </div>
                <div className="container py-5">
                    <h3>Популярные фильмы</h3>
                    {
                        !isloading &&
                        <OwlCarousel className="owl-theme my-4" autoplay={true} margin={10} items={6}>
                            {
                                popularMovie.map(item => (
                                    <Link to={`/film/${item.id}`}>
                                        <div className='box-movies'>
                                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt=""
                                                 className='poster'/>
                                            <h6 className='text-warning my-2'>{item.title}</h6>
                                        </div>
                                    </Link>
                                ))
                            }
                        </OwlCarousel>
                    }
                    {
                        Array(6).fill(0).map((el, index) =>
                            <button key={index + 1} onClick={() => handlePage(index + 1)}
                                    className={`btn btn-warning mx-2 ${page === index + 1 && "btn-light"}`}
                            >{index + 1}</button>
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
            </>
        );
    }
}

export default MainPage;