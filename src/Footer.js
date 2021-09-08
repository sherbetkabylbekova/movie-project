import React from 'react';
import {ReactComponent as LogoSvg} from "./Images/cinema.svg"

const Footer = () => {
    return (
        <footer>
                <div className="container ">
                    <div className="d-flex d-flex justify-content-between align-items-center">
                    <span><LogoSvg/> Online Cinema</span>
                    <p>2021 / Все права защищены</p>
                </div>
                </div>
        </footer>
    );
};

export default Footer;