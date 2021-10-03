import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import {
    FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, withStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import MainHeader from "../../component/mainHeader/MainHeader";
import Footer from "../../component/footer/Footer";
import BasicButton from "../../component/button/BasicButton";

import "./LoginPage.scss";

import {
    setPassword as setPasswordActionCreator,
    setUsername as setUsernameActionCreator
} from "./action/user";

const propTypes = {
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string
    }).isRequired,
    setPassword: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
};

const styles = {
    textField: {
        width: "20rem",
        marginTop: "0"
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px"
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "#a5a58d !important",
        }
    },
    cssFocused: {
        fontFamily: "Open Sans, sans-serif"
    },

    notchedOutline: {
        borderWidth: "1px",
    },
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setUsername: setUsernameActionCreator,
    setPassword: setPasswordActionCreator
}, dispatch);

const enhance = compose(
    connect(null,
        mapDispatchToProps),
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setUsername: ({ setUsername }) => (e) => setUsername(e.target.value),
    })),
    withStyles(styles)
);

const LoginPage = ({
    setPassword, setUsername, classes
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const navigateToRegisterPage = () => {
        history.push("/register");
    };
    return (
        <div>
            <MainHeader />
            <div className="content">
                <div className="row g-0">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image carousel" />
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8">
                                        <h3 className="login-heading mb-3">Welcome back!</h3>
                                        <div className="form">
                                            <div className="form-floating mb-3">
                                                <TextField
                                                    id="login-input"
                                                    label="Login"
                                                    className={classes.textField}
                                                    onChange={setUsername}
                                                    margin="normal"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.cssLabel,
                                                            focused: classes.cssFocused,
                                                        },
                                                    }}
                                                    InputProps={{
                                                        classes: {
                                                            root: classes.cssOutlinedInput,
                                                            focused: classes.cssFocused,
                                                            notchedOutline: classes.notchedOutline,
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <FormControl variant="outlined" className={classes.textField}>
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-password"
                                                        classes={{
                                                            root: classes.cssLabel,
                                                            focused: classes.cssFocused
                                                        }}
                                                    >
                                                        Password
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        classes={{
                                                            root: classes.cssOutlinedInput,
                                                            focused: classes.cssFocused,
                                                            notchedOutline: classes.notchedOutline
                                                        }}
                                                        type={showPassword ? "text" : "password"}
                                                        onChange={setPassword}
                                                        endAdornment={(
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    edge="end"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    className="show-password-button"
                                                                >
                                                                    {showPassword && (
                                                                        <VisibilityOff />
                                                                    )}
                                                                    {!showPassword && (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )}
                                                        label="Password"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="d-grid">
                                            <BasicButton onButtonClick={() => {}} label="Sign in">
                                                <span> Sign in </span>
                                            </BasicButton>
                                            <hr />
                                            <div className="createNewAccount">
                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                <span className="helper-text">Don't have an account?</span>
                                                <BasicButton onButtonClick={navigateToRegisterPage} label="Sign up" buttonClassName="reverse-button">
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
            <Footer />
        </div>
    );
};

LoginPage.propTypes = propTypes;

export default enhance(LoginPage);
