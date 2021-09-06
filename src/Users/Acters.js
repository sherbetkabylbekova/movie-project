import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import avatar from "../Images/avatar-anonymous-300x300.png";
import axios from "axios";

const Acters = () => {
    const key = '6f19f87e3380315b9573c4270bfc863c'
    const [credits, setCredits] = useState([])
    const params = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&language=ru&api_key=${key}`)
            .then(({data}) => setCredits(data.cast))
    }, [params.id])
    return (
        <div className="container py-5">
            <button className="btn btn-info" onClick={() => history.goBack()}>Back</button>
            <div className="row my-4">
                {
                    credits.map(user =>
                        <div className="col-md-3 col-sm-3 mb-3" key={user.id}>
                            <Link to={`/credits/${user.id}`}>
                                <img className="person-img"
                                     src={user.profile_path ? `https://image.tmdb.org/t/p/w500${user.profile_path}` : avatar}
                                     alt=""/>
                                <h4>{user.name}</h4>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Acters;