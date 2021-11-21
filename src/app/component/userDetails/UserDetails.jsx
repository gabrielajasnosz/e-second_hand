import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { getUserData } from "../../page/userProfile/selectors";
import "./UserDetails.scss";
import "moment/locale/pl";

const styles = {
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "20px",
        "&:hover,&:focus": {
            outline: "none"
        }
    },
};

const mapStateToProps = (state) => ({
    userData: getUserData(state),
});

const enhance = compose(
    connect(mapStateToProps,
        null),
    withStyles(styles)
);

const UserDetails = ({
// eslint-disable-next-line no-unused-vars
    userData, classes
}) => {
    // eslint-disable-next-line no-unused-vars
    const date = moment(userData.creationDate).locale("pl").format("DD MMM, YYYY");

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation();

    return (
        <div className="user-info">
            <div className="user-details">
                <div className="avatar-container">
                    <Avatar sx={{ width: "90px", height: "90px", marginBottom: "1rem" }}>
                        <PersonRoundedIcon className="avatar-icon" />
                    </Avatar>
                    <div className="user-info-details">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.5rem" }}>
                            <span className="user-name">
                                {" "}
                                { userData.displayName }
                            </span>
                            <span>
                                {t("In system since")}
                                {" "}
                                { date }
                            </span>
                        </div>
                        <span className="attribute">
                            {t("Gender")}
                            {" "}
                            <span className="value">
                                {t(userData.gender)}
                            </span>
                        </span>
                        <span className="attribute">
                            {t("Phone number")}
                            {" "}
                            {userData.phoneNumber ? (
                                <span className="value">
                                    {t(userData.phoneNumber)}
                                </span>
                            ) : (
                                <span className="value-empty">
                                    {t("No information")}
                                </span>
                            )}
                        </span>
                        <span className="attribute">
                            {t("City")}
                            {" "}
                            {userData.city ? (
                                <span className="value">
                                    {t(userData.city)}
                                </span>
                            ) : (
                                <span className="value-empty">
                                    {t("No information")}
                                </span>
                            )}
                        </span>
                        <span className="attribute">
                            {t("Zip code")}
                            {" "}
                            {userData.zipCode ? (
                                <span className="value">
                                    {t(userData.zipCode)}
                                </span>
                            ) : (
                                <span className="value-empty">
                                    {t("No information")}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                <div style={{
                    display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: "1rem"
                }}
                />
            </div>
        </div>
    );
};
UserDetails.propTypes = {
    userData: PropTypes.shape({
        id: PropTypes.string,
        creationDate: PropTypes.string,
        displayName: PropTypes.string,
        gender: PropTypes.string,
        phoneNumber: PropTypes.string,
        city: PropTypes.string,
        zipCode: PropTypes.string
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired
    }).isRequired,
};

export default enhance(UserDetails);
