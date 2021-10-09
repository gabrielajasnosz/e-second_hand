import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    MenuItem,
    withStyles
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import BasicButton from "../../component/button/BasicButton";
import Footer from "../../component/footer/Footer";
import MainHeader from "../../component/mainHeader/MainHeader";
import {
    setPassword as setPasswordActionCreator,
    setDisplayName as setDisplayNameActionCreator,
    setEmail as setEmailActionCreator,
    registerUser as registerUserActionCreator,
    resetData as resetDataActionCreator
} from "./action/registerPageData";
import "../loginPage/LoginPage.scss";
import {
    getEmailValidation, getDisplayNameValidation, getPasswordValidation, getEmailConflictStatus, getRegistrationStatus, getRegistrationMessage,
} from "./selectors";

const propTypes = {
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string,
        registrationSuccessful: PropTypes.string,
        registrationFail: PropTypes.string,
        helperText: PropTypes.string
    }).isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setDisplayName: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    emailError: PropTypes.bool.isRequired,
    displayNameError: PropTypes.bool.isRequired,
    passwordError: PropTypes.bool.isRequired,
    isEmailIncorrect: PropTypes.string,
    registrationStatus: PropTypes.bool,
    registrationMessage: PropTypes.string,
    resetData: PropTypes.func.isRequired,
};

const styles = {
    textField: {
        width: "20rem",
        margin: "0"
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px"
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "#a5a58d !important",
        },
        "&$cssError": {
            borderColor: "green",
        }
    },
    cssFocused: {
        fontFamily: "Open Sans, sans-serif"
    },

    notchedOutline: {
        borderWidth: "1px",
    },
    registrationSuccessful: {
        backgroundColor: "#c3e1cc",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        color: "black",
        borderRadius: ".3rem",
        marginBottom: "1rem",
        backgroundOpacity: 0.7,
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        width: "20rem",
    },
    registrationFail: {
        backgroundColor: "#eb0000cf",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        color: "black",
        borderRadius: ".3rem",
        marginBottom: "1rem",
        backgroundOpacity: 0.7,
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        width: "20rem",
    },
    helperText: {
        margin: 0,
        fontFamily: "Open Sans, sans-serif",
        fontSize: "12px",
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setPassword: setPasswordActionCreator,
    setEmail: setEmailActionCreator,
    setDisplayName: setDisplayNameActionCreator,
    registerUser: registerUserActionCreator,
    resetData: resetDataActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    emailError: getEmailValidation(state),
    passwordError: getPasswordValidation(state),
    displayNameError: getDisplayNameValidation(state),
    isEmailIncorrect: getEmailConflictStatus(state),
    registrationStatus: getRegistrationStatus(state),
    registrationMessage: getRegistrationMessage(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
        setDisplayName: ({ setDisplayName }) => (e) => setDisplayName(e.target.value),
    })),
    withStyles(styles)
);

const RegisterPage = ({
    setDisplayName, setEmail, setPassword,
    classes, registerUser, emailError, passwordError, displayNameError,
    isEmailIncorrect, registrationStatus, registrationMessage, resetData,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isButtonEnabled = emailError || passwordError || displayNameError;

    const history = useHistory();

    const navigateToLoginPage = () => {
        history.push("/login");
    };

    useEffect(() => () => {
        resetData();
    }, [resetData]);

    return (
        <div>
            <MainHeader />
            <div className="content">
                <div className="row">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image image" />
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8">
                                        {registrationStatus && (
                                            <div className={registrationStatus ? classes.registrationSuccessful : classes.registrationFail}>
                                                <span>
                                                    {registrationMessage}
                                                </span>
                                            </div>
                                        )}
                                        <h3 className="login-heading mb-3">Create new account</h3>
                                        <form className="form">
                                            <div className="form-floating mb-3">
                                                <TextField
                                                    id="display-name-input"
                                                    required
                                                    autoComplete="on"
                                                    label="Your first and last name"
                                                    className={classes.textField}
                                                    onChange={setDisplayName}
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
                                                <TextField
                                                    id="email-input"
                                                    required
                                                    label="Email"
                                                    error={isEmailIncorrect !== null}
                                                    helperText={isEmailIncorrect !== null ? isEmailIncorrect : null}
                                                    FormHelperTextProps={{
                                                        className: classes.helperText
                                                    }}
                                                    autoComplete="on"
                                                    className={classes.textField}
                                                    onChange={setEmail}
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
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    required
                                                    variant="outlined"
                                                    className={classes.textField}
                                                    label="Sex"
                                                    InputProps={{
                                                        classes: {
                                                            root: classes.cssOutlinedInput,
                                                            focused: classes.cssFocused,
                                                            notchedOutline: classes.notchedOutline,
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.cssLabel,
                                                            focused: classes.cssFocused,
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="WOMEN" className={classes.cssLabel}>
                                                        Women
                                                    </MenuItem>
                                                    <MenuItem value="MEN" className={classes.cssLabel}>
                                                        Men
                                                    </MenuItem>
                                                    <MenuItem value="OTHER" className={classes.cssLabel}>
                                                        Other
                                                    </MenuItem>

                                                </TextField>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <FormControl
                                                    variant="outlined"
                                                    required
                                                    autoComplete="on"
                                                    className={classes.textField}
                                                >
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
                                                        autoComplete="on"
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
                                        </form>
                                        <div className="d-grid">
                                            <BasicButton onButtonClick={registerUser} label="Sign up" disabled={isButtonEnabled}>
                                                <span> Sign up </span>
                                            </BasicButton>
                                            <hr />
                                            <div className="createNewAccount">
                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                <span className="helper-text">Already have an account?</span>
                                                <BasicButton onButtonClick={navigateToLoginPage} label="Sign in" buttonClassName="reverse-button">
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
