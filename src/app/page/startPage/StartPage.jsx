import React from "react";
import "./StartPage.scss";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Carousel from "../../component/carousel/Carousel";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import Item from "../itemPage/Item";
import NotFoundPage from "../notFoundPage/NotFoundPage";

const StartPage = () => {
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <div className="page-container">
                <Header />
                <Switch>
                    <Route exact path="/" component={Carousel} />
                    <Route exact path="/not-found" component={NotFoundPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Route
                        path="/confirmRegistration/:token"
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                        render={(props) => <LoginPage isAccountConfirmation {...props} />}
                    />
                    <Route path="/item/:id" component={Item} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Footer />

            </div>
        </Router>
    );
};

export default StartPage;
