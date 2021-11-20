import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
};

const PasswordInput = ({
    classes, onChange, label, showPassword, setShowPassword
}) => (
    <FormControl variant="outlined" className={classes.textField} required>
        <InputLabel
            htmlFor="outlined-adornment-password"
            classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused
            }}
        >
            {label}
        </InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            classes={{
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
            }}
            type={showPassword ? "text" : "password"}
            onChange={onChange}
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
            label={label}
        />
    </FormControl>

);

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
        loginFail: PropTypes.string
    }).isRequired,
    showPassword: PropTypes.bool.isRequired,
    setShowPassword: PropTypes.func.isRequired
};

PasswordInput.propTypes = propTypes;

export default withStyles(styles)(PasswordInput);
