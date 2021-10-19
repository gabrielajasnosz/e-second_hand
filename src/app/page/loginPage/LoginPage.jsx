import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { bindActionCreators } from "redux";
import withHandlers from "recompose/withHandlers";
import {
    withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BasicButton from "../../component/button/BasicButton";

import {
    getEmailValidation, getPasswordValidation, isLoginSuccessful as isLoginSuccessfulSelector
} from "./selectors";

import "./LoginPage.scss";

import {
    setPassword as setPasswordActionCreator,
    setEmail as setEmailActionCreator,
    login as loginUserActionCreator,
    resetData as resetDataActionCreator
} from "./action/user";
import { UserService } from "../../service/UserService";
import TextInput from "../../component/input/TextInput";
import PasswordInput from "../../component/input/PasswordInput";

const propTypes = {
    classes: PropTypes.shape({
        loginFail: PropTypes.string
    }).isRequired,
    setPassword: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    passwordEmpty: PropTypes.bool.isRequired,
    emailEmpty: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    isLoginSuccessful: PropTypes.bool.isRequired,
    resetData: PropTypes.func.isRequired
};

const styles = {
    loginFail: {
        backgroundColor: "transparent",
        border: "1px #dd0101 solid",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        color: "#dd0101",
        borderRadius: ".3rem",
        marginBottom: "1rem",
        backgroundOpacity: 0.7,
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        width: "20rem",
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setEmail: setEmailActionCreator,
    setPassword: setPasswordActionCreator,
    loginUser: loginUserActionCreator,
    resetData: resetDataActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    emailEmpty: getEmailValidation(state),
    passwordEmpty: getPasswordValidation(state),
    isLoginSuccessful: isLoginSuccessfulSelector(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
    })),
    withStyles(styles)
);

const LoginPage = ({
    setPassword, setEmail, classes, emailEmpty, passwordEmpty, loginUser, isLoginSuccessful, resetData
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    if (UserService.validateToken(UserService.currentUserValue)) {
        history.push("/");
    }

    const isButtonEnabled = emailEmpty || passwordEmpty;

    const navigateToRegisterPage = () => {
        history.push("/register");
    };

    useEffect(() => () => {
        resetData();
    }, [resetData]);

    return (

        <div>
            <Header />
            <div className="content">
                <div className="row g-0">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image image" />
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8">
                                        {isLoginSuccessful === false && (
                                            <div className={classes.loginFail}>
                                                <span>
                                                    Wrong email or password.
                                                </span>
                                            </div>
                                        )}
                                        <h3 className="login-heading mb-3">Welcome back!</h3>
                                        <div className="form">
                                            <div className="form-floating mb-3">
                                                <TextInput label="E-mail" onChange={setEmail} />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <PasswordInput
                                                    label="Password"
                                                    onChange={setPassword}
                                                    showPassword={showPassword}
                                                    setShowPassword={setShowPassword}
                                                />
                                            </div>
                                        </div>

                                        <div className="d-grid">
                                            <BasicButton
                                                onButtonClick={loginUser}
                                                label="Sign in"
                                                disabled={isButtonEnabled}
                                            >
                                                <span> Sign in </span>
                                            </BasicButton>
                                            <hr />
                                            <div className="createNewAccount">
                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                <span className="helper-text">Don't have an account?</span>
                                                <div style={{ marginTop: "1rem" }}>
                                                    <BasicButton
                                                        onButtonClick={navigateToRegisterPage}
                                                        label="Sign up"
                                                        buttonClassName="reverse-button"
                                                    >
                                                        <span> Sign up </span>
                                                    </BasicButton>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

LoginPage.propTypes = propTypes;

export default enhance(LoginPage);
