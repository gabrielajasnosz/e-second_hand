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
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserService } from "../../service/UserService";
import PopoverContent from "../popoverContent/CategoryPopover";
import {
    fetchCategories as fetchCategoriesActionCreator
} from "./action/header";
import MenuIconButton from "../button/MenuIconButton";

const propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        button: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        line: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }).isRequired,
};

const styles = {
    button: {
        textTransform: "capitalize",
        "&:hover,&:focus": {
            outline: "none"
        },
    },
    paper: {
        width: "15rem",
        height: "auto",
        overflow: "visible",
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
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchCategories: fetchCategoriesActionCreator,
}, dispatch);

const enhance = compose(
    connect(null,
        mapDispatchToProps),
    withHandlers(() => ({
        setPassword: ({ setPassword }) => (e) => setPassword(e.target.value),
        setEmail: ({ setEmail }) => (e) => setEmail(e.target.value),
    })),
    withStyles(styles)
);

const Header = ({ fetchCategories, classes }) => {
    const [anchorFemale, setAnchorFemale] = React.useState(null);
    const [anchorMale, setAnchorMale] = React.useState(null);

    const handleClickFemale = (event) => {
        setAnchorFemale(event.currentTarget);
    };

    const history = useHistory();

    const navigateToLoginPage = () => {
        history.push("/login");
    };
    const navigateToRegisterPage = () => {
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

    const isLoggedIn = !!UserService.currentUserValue;
    console.log(isLoggedIn);

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

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <img src="assets/images/logo.png" alt="Logo" />
                <a className="navbar-brand" href="/">e-second-hand</a>
                <MenuIconButton label="lol" onButtonClick={() => {}} buttonClassName="navbar-toggler" />
                <div className="collapse navbar-collapse justify-content-between" id="navbarResponsive">
                    <div className="navbar-nav">
                        <Button
                            aria-describedby={femaleId}
                            className={classNames(classes.button, "nav-link")}
                            disableRipple
                            onClick={handleClickFemale}
                        >
                            Woman
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
                            <PopoverContent sex="female" />
                        </Popover>
                        <Button
                            aria-describedby={maleId}
                            className={classNames(classes.button, "nav-link")}
                            disableRipple
                            onClick={handleClickMale}
                        >
                            Man
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
                            <PopoverContent sex="male" />
                        </Popover>
                    </div>
                    {!isLoggedIn ? (
                        <div className="navbar-nav">
                            <Button
                                className={classNames(classes.button, "nav-link")}
                                disableRipple
                                onClick={navigateToLoginPage}
                            >
                                Login
                            </Button>
                            <Button
                                className={classNames(classes.button, "nav-link")}
                                disableRipple
                                onClick={navigateToRegisterPage}
                            >
                                Register
                            </Button>
                        </div>
                    ) : (
                        <div className="navbar-nav">
                            <Box sx={{
                                display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"
                            }}
                            >
                                <IconButton onClick={handleClick} size="small">
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
                                <Box sx={{ backgroundColor: "#F0EFEB", height: "auto" }}>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                disableRipple
                                                onClick={() => {}}
                                            >
                                                <AccountCircleIcon className={classes.icon} />
                                                <ListItemText
                                                    disableTypography
                                                    primary={<Typography variant="body2" className={classes.field}>My profile</Typography>}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                disableRipple
                                                onClick={() => {}}
                                            >
                                                <SettingsIcon className={classes.icon} />
                                                <ListItemText
                                                    disableTypography
                                                    primary={<Typography variant="body2" className={classes.field}>Manage your data</Typography>}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                disableRipple
                                                onClick={() => {
                                                    UserService.logout();
                                                    window.location.href = "/";
                                                }}
                                            >
                                                <LogoutIcon className={classes.icon} />
                                                <ListItemText
                                                    disableTypography
                                                    primary={<Typography variant="body2" className={classes.field}>Logout</Typography>}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Popover>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Header.propTypes = propTypes;

export default enhance(Header);