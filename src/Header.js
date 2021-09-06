import React from 'react';
import {ReactComponent as LogoSvg} from "./Images/cinema.svg"
import Search from "./Search/Search";


const Header = () => {
        return (
            <header>
                <div className="container  d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <span><LogoSvg/></span>
                        <h2 className="mx-2">Online Cinema</h2>
                    </div>
                    <Search/>
                </div>
            </header>
        );
    }
    export default Header;