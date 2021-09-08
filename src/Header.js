import React from 'react';
import {ReactComponent as LogoSvg} from "./Images/cinema.svg"
import Search from "./Search/Search";


const Header = () => {
        return (
            <header>
                <div className="container  d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-between ">
                        <span><LogoSvg/></span>
                        <h2 className=" mx-2">Online Cinema</h2>
                        <ul>
                            <li><a href="#">Фильмы</a></li>
                            <li><a href="#">Сериалы</a></li>
                            <li><a href="#">Еще</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
    export default Header;