import React from "react";
import {
    FormControl, InputLabel, OutlinedInput, withStyles, TextField, InputAdornment, IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Visibility } from "@material-ui/icons";

const propTypes = {
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string
    }).isRequired,
    type: PropTypes.string
};
const styles = {
    textField: {
        width: "20rem",
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px"
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

const defaultProps = {
    type: "email",
};

const FormInput = ({ type, classes }) => (
    <div className="form-floating mb-3">
        {type === "email" && (
        <TextField
            id="login-input"
            label="Login"
            className={classes.textField}
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
        )}
        {type === "password" && (
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
                endAdornment={(
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            className="show-password-button"
                        >
                            <Visibility />
                        </IconButton>
                    </InputAdornment>
                )}
                label="Password"
            />
        </FormControl>
        )}
    </div>
);

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default withStyles(styles)(FormInput);
