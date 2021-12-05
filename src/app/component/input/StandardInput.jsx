import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";

const propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
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
    error: PropTypes.string,
    multiline: PropTypes.bool,
    endAdornment: PropTypes.bool,
    defaultValue: PropTypes.string,
    variant: PropTypes.string
};

const defaultProps = {
    error: null,
    multiline: null,
    endAdornment: null,
    defaultValue: null,
    label: null,
    variant: "outlined"
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
        maxWidth: "20rem",
        marginTop: "0",
        width: "100%",
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
        maxWidth: "20rem",
        width: "100%",
        minHeight: "3rem !important",
        height: "auto",
        marginTop: "0"
    },
    description: {
        width: "100%",
        marginTop: "0"
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    }
};

const StandardInput = ({
    classes, onChange, label, multiline, defaultValue
}, { ...props }) => (
    <TextField
        id="login-input"
        label={label}
        className={classes.description}
        onChange={onChange}
        autoComplete="off"
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
                input: multiline ? classes.descriptionInput : null
            }
        }}
        defaultValue={defaultValue}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
    />

);

StandardInput.propTypes = propTypes;
StandardInput.defaultProps = defaultProps;

export default withStyles(styles)(StandardInput);
