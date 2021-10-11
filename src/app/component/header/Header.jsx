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
import {
    fetchCategories as fetchCategoriesActionCreator
} from "./action/header";
import PopoverContent from "../popoverContent/PopoverContent";

const propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    classes: PropTypes.shape({
        button: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        line: PropTypes.string.isRequired
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
    },
    line: {
        margin: "0 0.5rem",
        color: "#a5a58d",
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

    const openFemale = Boolean(anchorFemale);
    const openMale = Boolean(anchorMale);
    const femaleId = openFemale ? "simple-popover" : undefined;
    const maleId = openMale ? "simple-popover" : undefined;
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <div className="categories">
                    <img src="assets/images/logo.png" alt="Logo" />
                    <a className="navbar-brand" href="/">e-second-hand</a>
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
                <div className="user-settings">
                    <Button
                        className={classNames(classes.button, "nav-link")}
                        disableRipple
                        onClick={navigateToLoginPage}
                    >
                        Login
                    </Button>
                    <span className={classes.line}>|</span>
                    <Button
                        className={classNames(classes.button, "nav-link")}
                        disableRipple
                        onClick={navigateToRegisterPage()}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = propTypes;

export default enhance(Header);
