import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string,
        loginFail: PropTypes.string,
        helperText: PropTypes.string,
        descriptionInput: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired
    }).isRequired,
    isEmailIncorrect: PropTypes.bool,
    multiline: PropTypes.bool,
    endAdornment: PropTypes.node
};

const defaultProps = {
    isEmailIncorrect: null,
    multiline: null,
    endAdornment: null
};

const styles = {
    root: {
        color: "#6b705c",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        "&:hover, &:focus": {
            outline: "none"
        }
    },
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
    helperText: {
        margin: 0,
        fontFamily: "Open Sans, sans-serif",
        fontSize: "12px",
    },
    descriptionInput: {
        width: "25rem",
        height: "3rem !important",
        marginTop: "0"
    },
    description: {
        width: "25rem",
        marginTop: "0"
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    }
};

const TextInput = ({
    classes, onChange, label, isEmailIncorrect, multiline, endAdornment
}) => (
    <TextField
        id="login-input"
        label={label}
        className={multiline ? classes.description : classes.textField}
        onChange={onChange}
        margin="normal"
        multiline={multiline}
        required
        error={isEmailIncorrect !== null}
        helperText={isEmailIncorrect !== null ? isEmailIncorrect : null}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        variant="outlined"
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            endAdornment: endAdornment ? <InputAdornment position="end"><span className={classes.cssLabel}>zł</span></InputAdornment> : null,
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: multiline ? classes.descriptionInput : null
            }
        }}
    />

);

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default withStyles(styles)(TextInput);
