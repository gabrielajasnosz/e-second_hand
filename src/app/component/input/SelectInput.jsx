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
        helperText: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

const defaultProps = {
    label: null,
    color: "beige"
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
        marginBottom: "8px",
        width: "100%",
    },
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        backgroundColor: "transparent"
    },
    paperWhite: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        backgroundColor: "white"
    },
    paperBeige: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        textTransform: "capitalize",
        backgroundColor: "#F0EFEB"
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
    // eslint-disable-next-line no-unused-vars
    classes, onChange, label, children, defaultValue, color
}) => {
    const classToUse = color === "white" ? "paperWhite" : "paperBeige";
    return (
        <TextField
            id="outlined-select-currency"
            select
            required
            variant="outlined"
            value={defaultValue || ""}
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
                    getContentAnchorEl: null,
                    classes: {
                        paper: classes[classToUse]
                    }
                },
                classes: {
                    root: classes.cssLabel,
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
};

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;
export default withStyles(styles)(SelectInput);
