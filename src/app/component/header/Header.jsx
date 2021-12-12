import React, { useEffect, useState } from "react";
import "./Header.scss";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import { Button, withStyles } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Badge from "@mui/material/Badge";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/Email";
import debounce from "lodash/debounce";
import Switch from "@mui/material/Switch";
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
    fetchColors as fetchColorsActionCreator,
    fetchChat as fetchChatActionCreator,
    fetchMessages as fetchMessagesActionCreator,
    fetchUnreadCounter as fetchUnreadCounterActionCreator,
    setMessages as setMessagesActionCreator
} from "./action/header";
import MenuIconButton from "../button/MenuIconButton";
import UserPopover from "../popoverContent/UserPopover";
import { getChatData, getSubcategories, getUnreadCounter } from "./selectors";
import "../../../translations/i18n";
import AsyncAutocomplete from "../input/AsyncAutocomplete";
import ModalContainer from "../modal/ModalContainer";
import ChangePassword from "../changePasswordModal/ChangePassword";
import MessagesContainer from "../popoverContent/MessagessContainer";
import { MessageService } from "../../service/MessageService";

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
        autocomplete: PropTypes.string.isRequired,
        checked: PropTypes.string.isRequired,
        track: PropTypes.string.isRequired,
        badge: PropTypes.string.isRequired,
        paperMessages: PropTypes.string.isRequired
    }).isRequired,
    setGender: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    fetchChat: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    chat: PropTypes.array.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    fetchUnreadCounter: PropTypes.func.isRequired,
    unreadCounter: PropTypes.number.isRequired,
    setMessages: PropTypes.func.isRequired
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
    paperMessages: {
        width: "20rem",
        maxHeight: "80%",
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
    },
    checked: {
        color: "#cb997e !important",
    },
    track: {
        backgroundColor: "#cb997e !important"
    },
    badge: {
        backgroundColor: "#6b705c !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    }
};

const mapStateToProps = (state) => ({
    categories: getSubcategories(state),
    chat: getChatData(state),
    unreadCounter: getUnreadCounter(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchCategories: fetchCategoriesActionCreator,
    fetchBrands: fetchBrandsActionCreator,
    fetchSizes: fetchSizesActionCreator,
    fetchColors: fetchColorsActionCreator,
    setGender: setGenderActionCreator,
    setCategory: setCategoryIdActionCreator,
    fetchChat: fetchChatActionCreator,
    fetchMessages: fetchMessagesActionCreator,
    fetchUnreadCounter: fetchUnreadCounterActionCreator,
    setMessages: setMessagesActionCreator
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
    fetchCategories,
    classes,
    fetchSizes,
    fetchBrands,
    fetchColors,
    // eslint-disable-next-line react/prop-types
    history,
    setGender,
    setCategory,
    fetchChat,
    chat,
    fetchMessages,
    fetchUnreadCounter,
    unreadCounter,
    setMessages
}) => {
    const { t } = useTranslation();
    const [anchorFemale, setAnchorFemale] = React.useState(null);
    const [anchorMale, setAnchorMale] = React.useState(null);
    const [anchorMessages, setAnchorMessages] = React.useState(null);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [userId, setUserId] = React.useState(null);

    const [languageCode, setLanguageCode] = useState(localStorage.getItem("i18nextLng"));

    const changeLanguage = () => {
        const lng = languageCode === "pl" ? "en" : "pl";
        localStorage.setItem("i18nextLng", lng);
        setLanguageCode(lng);
        window.location.reload(true);
    };

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

    const handleClickMessages = (event) => {
        setAnchorMessages(event.currentTarget);
    };

    const handleCloseMessages = () => {
        setAnchorMessages(null);
    };

    const openFemale = Boolean(anchorFemale);
    const openMale = Boolean(anchorMale);
    const openMessages = Boolean(anchorMessages);
    const femaleId = openFemale ? "simple-popover" : undefined;
    const maleId = openMale ? "simple-popover" : undefined;
    const messagesId = openMessages ? "simple-popover" : undefined;

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

    const [changePasswordModalOpen, setChangePasswordModalOpen] = React.useState(false);
    const handleChangePasswordModalOpen = () => {
        handleClose();
        setChangePasswordModalOpen(true);
    };
    const handleChangePasswordModalClose = () => {
        setChangePasswordModalOpen(false);
    };

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
        fetchColors();
        setLoggedIn(UserService.validateToken(UserService.currentUserValue));
        if (UserService.validateToken(UserService.currentUserValue)) {
            setUserId(UserService.decodedTokenValue.userId);
            fetchChat();
            fetchUnreadCounter();
            MessageService.subscribeOnNewMessages((message) => {
                setMessages(JSON.parse(message.body));
                fetchUnreadCounter();
            });
        }
    }, [fetchCategories, fetchSizes, fetchBrands, fetchColors, fetchChat, fetchUnreadCounter, setMessages]);

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25770.png" alt="" />
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
                                <AsyncAutocomplete
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
                            <div className="language-switch">
                                <span>pl</span>
                                <Switch
                                    checked={languageCode === "en"}
                                    onChange={changeLanguage}
                                    classes={{
                                        checked: classes.checked,
                                        track: classes.track
                                    }}
                                />
                                <span>en</span>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-nav">
                            <Box sx={{
                                display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"
                            }}
                            >
                                <Button
                                    className={classNames(classes.button, "nav-link")}
                                    disableRipple
                                    onClick={handleClickMessages}
                                >
                                    <Badge
                                        overlap="rectangular"
                                        badgeContent={unreadCounter}
                                        color="primary"
                                        classes={{
                                            badge: classes.badge
                                        }}
                                    >
                                        <EmailIcon />
                                    </Badge>
                                </Button>
                                <IconButton onClick={handleClick} size="small" classes={{ root: classes.userIcon }}>
                                    <Avatar
                                        src={`http://localhost:8080/users/profile-picture/${userId}`}
                                        sx={{ width: "40px", height: "40px" }}
                                    />
                                </IconButton>
                            </Box>
                        </div>
                    )}
                </div>
            </div>
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
                <UserPopover
                    classes={classes}
                    history={history}
                    onClose={handleClose}
                    handleChangePasswordModalOpen={handleChangePasswordModalOpen}
                />
            </Popover>
            <ModalContainer
                handleClose={handleChangePasswordModalClose}
                open={changePasswordModalOpen}
            >
                <ChangePassword handleClose={handleChangePasswordModalClose} />
            </ModalContainer>
            <Popover
                id={messagesId}
                open={openMessages}
                anchorEl={anchorMessages}
                onClose={handleCloseMessages}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                classes={{
                    paper: classes.paperMessages
                }}
            >
                <MessagesContainer chat={chat} history={history} fetchMessages={fetchMessages} />
            </Popover>
        </div>
    );
};

Header.propTypes = propTypes;
export default enhance(withRouter(Header));
