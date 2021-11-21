import React, { useEffect } from "react";
import "./Header.scss";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import { Button, withStyles } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { UserService } from "../../service/UserService";
import CategoryPopover from "../popoverContent/CategoryPopover";
import {
    setCategoryId as setCategoryIdActionCreator,
    setGender as setGenderActionCreator
} from "../../page/itemList/action/itemList";
import {
    fetchCategories as fetchCategoriesActionCreator,
    fetchBrands as fetchBrandsActionCreator,
    fetchSizes as fetchSizesActionCreator,
    fetchColors as fetchColorsActionCreator
} from "./action/categories";
import MenuIconButton from "../button/MenuIconButton";
import UserPopover from "../popoverContent/UserPopover";
import { getSubcategories } from "./selectors";
import "../../../translations/i18n";
import UserAutocomplete from "../input/AsyncAutocomplete";

const propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    fetchBrands: PropTypes.func.isRequired,
    fetchSizes: PropTypes.func.isRequired,
    fetchColors: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        button: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        line: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired,
        autocomplete: PropTypes.string.isRequired
    }).isRequired,
    setGender: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired
};

const styles = {
    button: {
        textTransform: "capitalize",
        "&:hover,&:focus": {
            outline: "none"
        },
    },
    paper: {
        width: "20rem",
        maxHeight: "20rem",
        overflow: "auto",
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    },
    line: {
        margin: "0 0.5rem",
        color: "#a5a58d",
    },
    field: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
        width: "9rem"
    },
    icon: {
        color: "#393938",
        fontSize: "20px",
        marginRight: "1rem"
    },
    divider: {
        width: "100%",
    },

    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    },
    autocomplete: {
        marginLeft: "1rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    }
};

const mapStateToProps = (state) => ({
    categories: getSubcategories(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchCategories: fetchCategoriesActionCreator,
    fetchBrands: fetchBrandsActionCreator,
    fetchSizes: fetchSizesActionCreator,
    fetchColors: fetchColorsActionCreator,
    setGender: setGenderActionCreator,
    setCategory: setCategoryIdActionCreator
}, dispatch);

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
    })),
    withStyles(styles)
);

const Header = ({
    // eslint-disable-next-line react/prop-types
    fetchCategories, classes, fetchSizes, fetchBrands, fetchColors, history, setGender, setCategory
}) => {
    const { t } = useTranslation();
    const [anchorFemale, setAnchorFemale] = React.useState(null);
    const [anchorMale, setAnchorMale] = React.useState(null);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClickFemale = (event) => {
        setAnchorFemale(event.currentTarget);
    };

    const navigateToLoginPage = () => {
        // eslint-disable-next-line react/prop-types
        history.push("/login");
    };
    const navigateToRegisterPage = () => {
        // eslint-disable-next-line react/prop-types
        history.push("/register");
    };

    const handleClickMale = (event) => {
        setAnchorMale(event.currentTarget);
    };

    const handleCloseFemale = () => {
        setAnchorFemale(null);
    };

    const handleCloseMale = () => {
        setAnchorMale(null);
    };

    const openFemale = Boolean(anchorFemale);
    const openMale = Boolean(anchorMale);
    const femaleId = openFemale ? "simple-popover" : undefined;
    const maleId = openMale ? "simple-popover" : undefined;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const mapOptionsToValues = (optionss) => optionss.map((option) => ({
        value: option.id,
        name: option.displayName
    }));

    const setKeyword = (keyword) => {
        setInputValue(keyword);
        setOptions([]);
        if (keyword.length > 2) {
            UserService.findUsers(keyword).then((response) => response.json()).then((json) => {
                setOptions(mapOptionsToValues(json));
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line consistent-return
    const getOptions = (keyword) => {
        setKeyword(keyword);
    };

    // eslint-disable-next-line no-unused-vars
    const debouncedLoadSuggestions = debounce((e) => getOptions(e.target.value), 2000);

    const onChange = (e) => {
        if (e.target.value.length > 2) {
            setIsLoading(true);
        }
        debouncedLoadSuggestions(e);
    };

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
        fetchColors();
        setLoggedIn(UserService.validateToken(UserService.currentUserValue));
    }, [fetchCategories, fetchSizes, fetchBrands, fetchColors]);

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <img src="assets/images/clothes-hanger.png" alt="" />
                {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                <div className="navbar-brand" role="button" onClick={() => history.push("/")}>e-second-hand</div>
                <MenuIconButton label="lol" onButtonClick={() => {}} buttonClassName="navbar-toggler" />
                <div className="collapse navbar-collapse justify-content-between" id="navbarResponsive">
                    <div className="navbar-nav">
                        <Button
                            aria-describedby={femaleId}
                            className={classNames(classes.button, "nav-link")}
                            disableRipple
                            onClick={handleClickFemale}
                        >
                            {t("woman")}
                        </Button>
                        <Popover
                            id={femaleId}
                            open={openFemale}
                            anchorEl={anchorFemale}
                            onClose={handleCloseFemale}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            classes={{
                                paper: classes.paper
                            }}
                        >
                            <CategoryPopover
                                sex="woman"
                                openContext="HEADER"
                                onClose={handleCloseFemale}
                                setCategory={setCategory}
                                setSex={setGender}
                                history={history}
                            />
                        </Popover>
                        <Button
                            aria-describedby={maleId}
                            className={classNames(classes.button, "nav-link")}
                            disableRipple
                            onClick={handleClickMale}
                        >
                            {t("man")}
                        </Button>
                        <Popover
                            id={maleId}
                            open={openMale}
                            anchorEl={anchorMale}
                            onClose={handleCloseMale}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            classes={{
                                paper: classes.paper
                            }}
                        >
                            <CategoryPopover
                                history={history}
                                sex="man"
                                openContext="HEADER"
                                onClose={handleCloseMale}
                                setCategory={setCategory}
                                setSex={setGender}
                            />
                        </Popover>
                        { isLoggedIn && (
                            <div className={classes.autocomplete}>
                                <UserAutocomplete
                                    onChange={onChange}
                                    passedOptions={options}
                                    defaultValue={inputValue}
                                    isLoading={isLoading}
                                    history={history}
                                />
                            </div>
                        ) }
                    </div>
                    {!isLoggedIn ? (
                        <div className="navbar-nav">
                            <Button
                                className={classNames(classes.button, "nav-link")}
                                disableRipple
                                onClick={navigateToLoginPage}
                            >
                                {t("login")}
                            </Button>
                            <Button
                                className={classNames(classes.button, "nav-link")}
                                disableRipple
                                onClick={navigateToRegisterPage}
                            >
                                {t("register")}
                            </Button>
                        </div>
                    ) : (
                        <div className="navbar-nav">
                            <Box sx={{
                                display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"
                            }}
                            >
                                <IconButton onClick={handleClick} size="small" classes={{ root: classes.userIcon }}>
                                    <Avatar>
                                        <PersonRoundedIcon />
                                    </Avatar>
                                </IconButton>
                            </Box>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                classes={{
                                    paper: classes.paper
                                }}
                            >
                                <UserPopover classes={classes} history={history} />
                            </Popover>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Header.propTypes = propTypes;
export default enhance(withRouter(Header));
