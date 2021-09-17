import React from "react";
import "./StartPage.scss";
import MainHeader from "../../component/mainHeader/MainHeader";
import Footer from "../../component/footer/Footer";
import Carousel from "../../component/carousel/Carousel";

const StartPage = () => (
    <div>
        <MainHeader />
        <Carousel />
        <Footer />
    </div>
);

export default StartPage;
