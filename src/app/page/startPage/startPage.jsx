import React from "react";
import "./startPage.scss";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import MainHeader from "../../component/mainHeader/mainHeader";

const StartPage = () => (
    <div>
        <MainHeader />
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-100 img-fluid w-100" src="https://placeimg.com/1080/500/animals" alt="First slide" />
                    <div className="carousel-caption">
                        <h5>My Caption Title (1st Image)</h5>
                        <p>The whole caption will only show up if the screen is at least medium size.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block img-fluid w-100" src="https://placeimg.com/1080/500/animals" alt="First slide" />
                    <div className="carousel-caption">
                        <h5>My Caption Title (1st Image)</h5>
                        <p>The whole caption will only show up if the screen is at least medium size.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block img-fluid w-100" src="https://placeimg.com/1080/500/animals" alt="First slide" />
                    <div className="carousel-caption">
                        <h5>My Caption Title (1st Image)</h5>
                        <p>The whole caption will only show up if the screen is at least medium size.</p>
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
        <section className="py">
            <div className="container">
                <h1 className="fw-light">Full Page Image Slider</h1>
                <p className="lead">
                    The background images for the slider are set directly in the HTML using inline CSS.
                    The images
                    in this snippet are from
                    <a href="https://unsplash.com">Unsplash</a>
                    , taken by
                    <a
                        href="https://unsplash.com/@joannakosinska"
                    >
                        Joanna Kosinska
                    </a>
                    !
                </p>
            </div>
        </section>
    </div>
);

export default StartPage;
