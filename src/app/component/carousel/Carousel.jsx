import React from "react";
import "./Carousel.scss";
import { Tooltip, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { useTranslation } from "react-i18next";
import BasicButton from "../button/BasicButton";
import { UserService } from "../../service/UserService";
import ModalContainer from "../modal/ModalContainer";
import { resetData as resetDataActionCreator } from "../addItem/action/newItem";
import AddItem from "../addItem/AddItem";

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
        width: "auto",
        maxWidth: "40rem",
        minWidth: "35rem",
        height: "auto",
        backgroundColor: "#F0EFEB !important",
        borderRadius: ".3rem",
        boxShadow: 24,
        p: 4,
    },
    step: {
        width: "auto",
        height: "auto",
        maxHeight: "25rem",
        overflow: "auto"
    },
    stepper: {
        width: "100%",
        backgroundColor: "transparent",
        padding: "2rem 0"
    },
    icon: {
        color: "#bababa"
    },
    editIcon: {
        color: "#393938",
        fontSize: "20px"
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
        fontSize: "14px",
        textTransform: "capitalize",
        width: "100%",
        backgroundColor: "#F0EFEB"
    },
    cssLabelName: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "16px",
        paddingBottom: "1rem"
    },
    cssLabelCategory: {
        color: "black !important",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    },
    userIcon: {
        "&:hover, &:focus": {
            outline: "none",
        }
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
    chosenCategory: {
        display: "flex",
        flexDirection: "row",
        width: "20rem",
        border: "1px #bababa solid",
        alignItems: "center",
        borderRadius: "4px",
        textTransform: "capitalize",
        justifyContent: "space-between",
        height: "56px",
        padding: "13px",
        "&:hover": {
            borderColor: "black",
            cursor: "pointer"
        },
        "&:focus": {
            borderColor: "#a5a58d !important",
            borderWidth: "2px",
            cursor: "pointer"
        },
    },
    alertStyle: {
        justifyContent: "center",
        width: "20rem",
        margin: "1rem 0"
    },
    message: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "14px",
    }
};

const propTypes = {
    classes: PropTypes.shape({
        tooltip: PropTypes.string.isRequired,
        modal: PropTypes.string.isRequired
    }).isRequired,
    resetData: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    resetData: resetDataActionCreator,
}, dispatch);

const enhance = compose(
    connect(null,
        mapDispatchToProps),
    withStyles(styles)
);

const Carousel = ({ classes, resetData }) => {
    const { t } = useTranslation();
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const tooltip = isLoggedIn ? t("Add new item") : t("Sign in to add new item");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        resetData();
    };
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
                <div className="navigation-field">
                    <Tooltip
                        title={tooltip}
                    >
                        <div className="navigation-button">
                            <BasicButton disabled={!isLoggedIn} onButtonClick={handleOpen}>
                                <span>
                                    {" "}
                                    {t("Add new item")}
                                    {" "}
                                </span>
                            </BasicButton>
                        </div>
                    </Tooltip>
                    <ModalContainer
                        handleClose={handleClose}
                        open={open}
                    >
                        <AddItem classes={classes} handleClose={handleClose} />
                    </ModalContainer>
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

Carousel.propTypes = propTypes;

export default enhance(Carousel);
