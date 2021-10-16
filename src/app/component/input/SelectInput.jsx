import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";

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
        helperText: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired,
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
        marginTop: "0",
        marginBottom: "8px"
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
    }
};

const SelectInput = ({
    classes, onChange, label, children
}) => (
    <TextField
        id="outlined-select-currency"
        select
        required
        variant="outlined"
        className={classes.textField}
        onChange={onChange}
        label={label}
        SelectProps={{
            MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                },
                getContentAnchorEl: null
            },

            classes: {
                root: classes.cssLabel
            },
        }}
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
        {children}
    </TextField>

);

SelectInput.propTypes = propTypes;

export default withStyles(styles)(SelectInput);
