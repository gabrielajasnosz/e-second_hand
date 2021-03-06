import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

const propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    classes: PropTypes.shape({
        input: PropTypes.string,
        textField: PropTypes.string,
        cssLabel: PropTypes.string,
        cssLabelWhite: PropTypes.string,
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string,
        loginFail: PropTypes.string,
        helperText: PropTypes.string
    }).isRequired,
    children: PropTypes.node,
    disableAdding: PropTypes.bool,
    color: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    passedOptions: PropTypes.array.isRequired,
    attributeName: PropTypes.string
};

const defaultProps = {
    children: null,
    label: null,
    color: "beige",
    disableAdding: false,
    attributeName: "name"
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
        width: "100%",
        marginTop: "0",
        marginBottom: "8px"
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        backgroundColor: "#F0EFEB !important"
    },
    cssLabelWhite: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        backgroundColor: "white !important"
    },
    cssOutlinedInput: {
        height: "56px !important",
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
const filter = createFilterOptions();

const AutocompleteInput = ({
    onChange, classes, defaultValue, passedOptions, color, disableAdding, attributeName
}) => (
    <Autocomplete
        onSelect={onChange}
        value={defaultValue}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option[attributeName]);
            if (inputValue !== "" && !isExisting && !disableAdding) {
                filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                });
            }

            return filtered;
        }}
        options={passedOptions}
        getOptionLabel={(option) => {
            if (typeof option === "string") {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.name;
        }}
        disableClearable
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        classes={{
            root: classes.cssOutlinedInput,
            option: classes.cssLabel,
            inputRoot: color === "beige" ? classes.cssLabel : classes.cssLabelWhite,
            input: color === "beige" ? classes.cssLabel : classes.cssLabelWhite,
            paper: classes.cssLabel
        }}
        renderInput={(params) => (
            <TextField
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...params}
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    ...params.InputProps,
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    }
                }}
            />
        )}
    />

);

AutocompleteInput.propTypes = propTypes;
AutocompleteInput.defaultProps = defaultProps;

export default withStyles(styles)(AutocompleteInput);
