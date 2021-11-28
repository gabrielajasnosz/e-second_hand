import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { getUserData } from "../../page/userProfile/selectors";
import "./UserDetails.scss";
import "moment/locale/pl";
import TextButton from "../button/TextButton";
import { UserService } from "../../service/UserService";
import ChangeImageDialog from "./ChangeImageDialog";
import ModalContainer from "../modal/ModalContainer";
import EditProfile from "../editProfile/EditProfile";
import RatingCustom from "../rating/RatingCustom";

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
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const userHasRightToEditProfile = isLoggedIn && UserService.decodedTokenValue.userId === userData.id;

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const { t } = useTranslation();

    return (
        <div className="user-info">
            <div className="user-details">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="edit-profile">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                showBadge={userHasRightToEditProfile}
                                badgeContent={(
                                    <IconButton onClick={handleDialogOpen} classes={{ root: classes.icon }}>
                                        {userHasRightToEditProfile && userData.profilePictureLocation === null && (
                                            <AddAPhotoIcon />
                                        )}
                                        {userHasRightToEditProfile && userData.profilePictureLocation !== null && (
                                            <EditIcon />
                                        )}
                                    </IconButton>
                                )}
                            >
                                {userData.profilePictureLocation === null ? (
                                    <Avatar sx={{ width: "90px", height: "90px" }}>
                                        <PersonRoundedIcon className="avatar-icon " />
                                    </Avatar>
                                ) : (
                                    <Avatar
                                        src={`http://localhost:8080/user/profile-picture/${userData.id}`}
                                        sx={{ width: "90px", height: "90px" }}
                                    />
                                )}

                            </Badge>
                            { userData.rating && (
                                <div style={{ marginLeft: "0.5rem", marginTop: "1rem" }}>
                                    <RatingCustom
                                        rating={userData.rating}
                                        readOnly
                                        precision={0.2}
                                    />
                                </div>
                            )}
                        </div>
                        { userHasRightToEditProfile && (
                        <TextButton onClick={handleModalOpen}>
                            <span>{t("Edit profile")}</span>
                        </TextButton>
                        ) }
                    </div>

                    <div className="avatar-container">
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
                </div>
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "25rem",
                            minHeight: "15rem",
                            maxHeight: "25rem",
                            padding: "0 1rem",
                        }
                    }}
                >
                    <ChangeImageDialog handleClose={handleDialogClose} />
                </Dialog>
                <ModalContainer
                    handleClose={handleModalClose}
                    open={modalOpen}
                >
                    <EditProfile handleClose={handleModalClose} userData={userData} />
                </ModalContainer>
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
        zipCode: PropTypes.string,
        profilePictureLocation: PropTypes.string,
        rating: PropTypes.number
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired
    }).isRequired,
};

export default enhance(UserDetails);
