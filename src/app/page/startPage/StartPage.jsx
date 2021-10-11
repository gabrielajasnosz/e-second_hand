import React from "react";
import "./StartPage.scss";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Carousel from "../../component/carousel/Carousel";

const StartPage = () => (
    <div className="page-container">
        <Header />
        <div className="page-content">
            <Carousel />
        </div>
        <Footer />

    </div>
);

export default StartPage;
