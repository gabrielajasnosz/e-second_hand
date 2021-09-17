import React from "react";
import "./Carousel.scss";

const Carousel = () => (
    <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item carousel-first active">
                <div className="carousel-caption">
                    <p>My Caption Title (1st Image)</p>
                    <span>The whole caption will only show up if the screen is at least medium size.</span>
                </div>
            </div>
            <div className="carousel-item carousel-second">
                <div className="carousel-caption">
                    <p>My Caption Title (1st Image)</p>
                    <span>The whole caption will only show up if the screen is at least medium size.</span>
                </div>
            </div>
            <div className="carousel-item carousel-third">
                <div className="carousel-caption">
                    <p>My Caption Title (1st Image)</p>
                    <span>The whole caption will only show up if the screen is at least medium size.</span>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev d-flex" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next d-flex" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
        </a>
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
    </div>
);

export default Carousel;
