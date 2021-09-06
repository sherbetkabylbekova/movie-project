import React, {useEffect, useState} from 'react';
import ModalVideo from 'react-modal-video'
import axios from "axios";
import {ReactComponent as PlaySvg} from "./Images/bx-play-circle.svg"



const Trailers = ({id, filmId}) => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [movie, setMovie] = useState({})
    useEffect(() => {
            axios(`https://api.themoviedb.org/3/movie/${filmId}?&language=ru&api_key=${key}`)
                .then(({data}) => setMovie(data))
        }
    )
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)}/>
            <button className="btn-primary" onClick={() => setOpen(true)}>
                <img className="person-img" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt=""/>
                <span><PlaySvg/></span>
            </button>
        </>

    )
};

export default Trailers;