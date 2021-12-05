import React from "react";
import "./StartPage.scss";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import HomePage from "../homePage/HomePage";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import Item from "../itemPage/Item";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import ItemList from "../itemList/ItemList";
import UserProfile from "../userProfile/UserProfile";
import ChatPage from "../chatPage/ChatPage";

const StartPage = () => {
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <Header />
            <div className="page-container">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/not-found" component={NotFoundPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/chat/:id" component={ChatPage} />
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Route
                        path="/confirmRegistration/:token"
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                        render={(props) => <LoginPage isAccountConfirmation {...props} />}
                    />
                    <Route path="/item/:id" component={Item} />
                    <Route path="/user/:id" component={UserProfile} />
                    <Route path="/list" component={ItemList} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};

export default StartPage;
