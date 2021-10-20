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
        cssOutlinedInput: PropTypes.string,
        cssFocused: PropTypes.string,
        notchedOutline: PropTypes.string,
        loginFail: PropTypes.string,
        helperText: PropTypes.string
    }).isRequired,
    children: PropTypes.node,
    defaultValue: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    passedOptions: PropTypes.array.isRequired
};

const defaultProps = {
    children: null,
    label: null,
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
    onChange, classes, defaultValue, passedOptions
}) => (
    <Autocomplete
        onSelect={onChange}
        defaultValue={defaultValue}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== "" && !isExisting) {
                filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                });
            }

            return filtered;
        }}
        selectOnFocus
        handleHomeEndKeys
        options={passedOptions}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
                return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
                return option.inputValue;
            }
            // Regular option
            return option.name;
        }}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        classes={{
            root: classes.cssOutlinedInput,
            option: classes.cssLabel,
            inputRoot: classes.cssLabel,
            input: classes.cssLabel
        }}
        freeSolo
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
