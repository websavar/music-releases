import React from "react";
import "./index.scss";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <a href="/">
                        <img src="./logo.png" alt="logo" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
