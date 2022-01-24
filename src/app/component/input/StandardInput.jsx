import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@mui/material/TextField";

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
    defaultValue: PropTypes.string,
};

const defaultProps = {
    defaultValue: null,
    label: null
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
        marginTop: "0",
        width: "100%",
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px"
    },
    cssOutlinedInput: {
        "&:before": {
            borderBottom: "1px solid grey !important"
        },
        "&:hover:before": {
            borderBottom: "2px solid #a5a58d !important"
        },
        "&:after": {
            borderBottom: "2px solid #6b705c !important"
        },
    },
    cssFocused: {
        fontFamily: "Open Sans, sans-serif"
    },

    notchedOutline: {
        borderWidth: "1px",
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    }
};

const StandardInput = ({
// eslint-disable-next-line no-unused-vars
    classes, onChange, label, defaultValue
}, { ...props }) => (
    <TextField
        id="message-input"
        label={label}
        className={classes.textField}
        onChange={onChange}
        variant="standard"
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
                underline: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
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
