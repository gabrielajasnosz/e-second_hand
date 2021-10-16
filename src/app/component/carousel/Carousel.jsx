import React from "react";
import "./Carousel.scss";
import { Tooltip, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import BasicButton from "../button/BasicButton";

import { UserService } from "../../service/UserService";
import AddItemModal from "../addItemModal/AddItemModal";

const propTypes = {
    classes: PropTypes.shape({
        tooltip: PropTypes.string.isRequired,
        modal: PropTypes.string.isRequired
    }).isRequired
};

// eslint-disable-next-line no-unused-vars
const Carousel = ({ classes }) => {
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const tooltip = isLoggedIn ? "Sell" : "Create an account to add your item.";
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
                <div className="navigation-field">
                    <Tooltip
                        title={tooltip}
                    >
                        <div className="navigation-button">
                            <BasicButton disabled={!isLoggedIn} onButtonClick={handleOpen}>
                                <span> Sell  </span>
                            </BasicButton>
                        </div>
                    </Tooltip>
                    <AddItemModal classes={classes} handleClose={handleClose} open={open} />
                </div>
                <div className="carousel-item carousel-first active">
                    <div className="carousel-caption">
                        <p>My Caption Title (1st Image)</p>
                        <span>The whole caption will only show up if the screen is at least medium size.</span>
                    </div>
                </div>
                <div className="carousel-item carousel-second">
                    <div className="carousel-caption">
                        <p>My Caption Title (1st Image)</p>
                        <span>The whole caption will only show up if the screen is at least medium size.</span>
                    </div>
                </div>
                <div className="carousel-item carousel-third">
                    <div className="carousel-caption">
                        <p>My Caption Title (1st Image)</p>
                        <span>The whole caption will only show up if the screen is at least medium size.</span>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev d-flex" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next d-flex" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to="1" />
                <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
        </div>
    );
};

const styles = {
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: "220px",
        fontSize: "12px",
        border: "1px solid #dadde9"
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50rem",
        minHeight: "32rem",
        height: "auto",
        backgroundColor: "#F0EFEB !important",
        borderRadius: ".3rem",
        boxShadow: 24,
        p: 4,
    },
    stepper: {
        width: "100%",
        backgroundColor: "transparent",
        padding: "2rem 0"
    },
    icon: {
        color: "#bababa"
    },
    iconActive: {
        color: "#cb997e !important",
    },
    iconCompleted: {
        color: "#ddbea9 !important",
    },
    label: {
        fontFamily: "Open Sans, sans serif !important",
        fontSize: "16px"
    },
    cssLabel: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        paddingBottom: "1rem"
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
    }
};

Carousel.propTypes = propTypes;

export default withStyles(styles)(Carousel);
