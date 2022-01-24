import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

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
        maxWidth: "22rem",
        marginTop: "0"
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    }
};

const TextInput = ({
    classes, onChange, label, error, multiline, endAdornment, defaultValue, variant
}, { ...props }) => (
    <TextField
        id="login-input"
        label={label}
        className={multiline ? classes.description : classes.textField}
        onChange={onChange}
        margin="normal"
        multiline={multiline}
        autoComplete="off"
        required
        variant={variant}
        error={error !== null}
        helperText={error !== null ? error : null}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            endAdornment: endAdornment ? <InputAdornment position="end"><span className={classes.cssLabel}>PLN</span></InputAdornment> : null,
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

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default withStyles(styles)(TextInput);
