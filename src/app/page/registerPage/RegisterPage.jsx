import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import {
    MenuItem,
    withStyles
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import BasicButton from "../../component/button/BasicButton";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import {
    setPassword as setPasswordActionCreator,
    setDisplayName as setDisplayNameActionCreator,
    setEmail as setEmailActionCreator,
    registerUser as registerUserActionCreator,
    resetData as resetDataActionCreator,
    setSex as setSexActionCreator
} from "./action/registerPageData";
import "../loginPage/LoginPage.scss";
import {
    getEmailValidation,
    getDisplayNameValidation,
    getPasswordValidation,
    getEmailConflictStatus,
    getRegistrationStatus,
    getRegistrationMessage,
    getSexValidation, getSex,
} from "./selectors";
import { UserService } from "../../service/UserService";
import TextInput from "../../component/input/TextInput";
import PasswordInput from "../../component/input/PasswordInput";
import SelectInput from "../../component/input/SelectInput";

const propTypes = {
    classes: PropTypes.shape({
        alert: PropTypes.string,
        message: PropTypes.string,
        cssLabel: PropTypes.string
    }).isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setDisplayName: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    emailError: PropTypes.bool.isRequired,
    displayNameError: PropTypes.bool.isRequired,
    passwordError: PropTypes.bool.isRequired,
    sexError: PropTypes.bool.isRequired,
    sex: PropTypes.bool.isRequired,
    isEmailIncorrect: PropTypes.string,
    registrationStatus: PropTypes.bool,
    registrationMessage: PropTypes.string,
    resetData: PropTypes.func.isRequired,
    setSex: PropTypes.func.isRequired
};

const styles = {
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px"
    },
    alert: {
        justifyContent: "center",
        width: "20rem",
        margin: "1rem 0"
    },
    message: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setPassword: setPasswordActionCreator,
    setEmail: setEmailActionCreator,
    setDisplayName: setDisplayNameActionCreator,
    registerUser: registerUserActionCreator,
    resetData: resetDataActionCreator,
    setSex: setSexActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    emailError: getEmailValidation(state),
    passwordError: getPasswordValidation(state),
    displayNameError: getDisplayNameValidation(state),
    sexError: getSexValidation(state),
    sex: getSex(state),
    isEmailIncorrect: getEmailConflictStatus(state),
    registrationStatus: getRegistrationStatus(state),
    registrationMessage: getRegistrationMessage(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setSex: ({ setSex }) => (e) => setSex(e.target.value),
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
        setDisplayName: ({ setDisplayName }) => (e) => setDisplayName(e.target.value),
    })),
    withStyles(styles)
);

const RegisterPage = ({
    setDisplayName, setEmail, setPassword,
    classes, registerUser, emailError, passwordError, displayNameError,
    isEmailIncorrect, registrationStatus, registrationMessage, resetData, setSex, sex, sexError
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isButtonEnabled = emailError || passwordError || displayNameError || sexError;

    const history = useHistory();

    if (UserService.validateToken(UserService.currentUserValue)) {
        history.push("/");
    }

    const navigateToLoginPage = () => {
        history.push("/login");
    };

    useEffect(() => () => {
        resetData();
    }, [resetData]);

    return (
        <div>
            <Header />
            <div className="content">
                <div className="row">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image image" />
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8">
                                        {registrationStatus !== null && (
                                        <Alert
                                            severity={registrationStatus ? "success" : "error"}
                                            classes={{ root: classes.alert, message: classes.message }}
                                        >
                                            {registrationMessage}
                                        </Alert>
                                        )}
                                        <h3 className="login-heading mb-3">Create new account</h3>
                                        <form className="form">
                                            <div className="form-floating mb-3">
                                                <TextInput label="Your first and last name" onChange={setDisplayName} />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <TextInput label="E-mail" onChange={setEmail} error={isEmailIncorrect} />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <SelectInput label="Sex" onChange={setSex} color="white" defaultValue={sex}>
                                                    <MenuItem value="WOMAN" className={classes.cssLabel}>
                                                        Woman
                                                    </MenuItem>
                                                    <MenuItem value="MAN" className={classes.cssLabel}>
                                                        Man
                                                    </MenuItem>
                                                    <MenuItem value="UNDEFINED" className={classes.cssLabel}>
                                                        Other
                                                    </MenuItem>
                                                </SelectInput>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <PasswordInput
                                                    label="Password"
                                                    onChange={setPassword}
                                                    showPassword={showPassword}
                                                    setShowPassword={setShowPassword}
                                                />
                                            </div>
                                        </form>
                                        <div className="d-grid">
                                            <BasicButton onButtonClick={registerUser} label="Sign up" disabled={isButtonEnabled}>
                                                <span> Sign up </span>
                                            </BasicButton>
                                            <hr />
                                            <div className="createNewAccount">
                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                <span className="helper-text">Already have an account?</span>
                                                <div style={{ marginTop: "1rem" }}>
                                                    <BasicButton
                                                        onButtonClick={navigateToLoginPage}
                                                        label="Sign in"
                                                        buttonClassName="reverse-button"
                                                    >
                                                        <span> Sign in </span>
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

RegisterPage.propTypes = propTypes;

RegisterPage.defaultProps = {
    registrationStatus: null,
    registrationMessage: null,
    isEmailIncorrect: null
};

export default enhance(RegisterPage);
