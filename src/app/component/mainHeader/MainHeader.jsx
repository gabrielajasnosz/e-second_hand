import React from "react";
import "./MainHeader.scss";
import MenuIconButton from "../button/MenuIconButton";

const MainHeader = () => (
    <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
            <img src="assets/images/logo.png" alt="Logo" />
            <a className="navbar-brand" href="/">e-second-hand</a>
            <MenuIconButton label="lol" onButtonClick={() => {}} buttonClassName="navbar-toggler" />
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Sign In</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Sign Up</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default MainHeader;
