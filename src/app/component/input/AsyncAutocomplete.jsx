import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import Progress from "../progress/Progress";

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
    attributeName: PropTypes.string,
    filterFunction: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired
};

const defaultProps = {
    children: null,
    label: null,
    color: "beige",
    disableAdding: false,
    attributeName: "name",
    filterFunction: true
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
        width: "100%",
        marginTop: "0",
        marginBottom: "8px"
    },

    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        backgroundColor: "#F0EFEB !important"
    },
    cssLabelWhite: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
        backgroundColor: "white !important"
    },
    cssOutlinedInput: {
        height: "40px !important",
        display: "flex",
        alignContent: "center",
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

const AsyncAutocomplete = ({
// eslint-disable-next-line no-unused-vars
    onChange, classes, defaultValue, passedOptions, color, isLoading, history
}) => {
    const { t } = useTranslation();

    return (
        <Autocomplete
            onSelect={onChange}
            value={defaultValue}
            filterOptions={(options) => options}
            options={passedOptions}
            autoComplete="off"
            disablePortal
            loading={isLoading}
            loadingText={<Progress />}
            noOptionsText={t("No users found")}
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
            renderOption={(props, option) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,no-return-assign
                <div role="button" onClick={() => window.location.href = (`/user/${option.value}`)}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <ListItem {...props}>
                        <ListItemAvatar>
                            <Avatar
                                src={`http://localhost:8080/users/profile-picture/${option.value}`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            classes={{ primary: classes.cssLabel }}
                            primary={option.name}
                        />
                    </ListItem>
                </div>
            )}
            sx={{ width: 350 }}
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
                    placeholder={t("Search for users...")}
                    autoComplete="off"
                    autoFocus={false}
                    className={classes.textField}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        ...params.InputProps,
                        autoComplete: "off",
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            input: classes.cssLabel
                        }
                    }}
                />
            )}
        />
    );
};

AsyncAutocomplete.propTypes = propTypes;
AsyncAutocomplete.defaultProps = defaultProps;

export default withStyles(styles)(AsyncAutocomplete);
