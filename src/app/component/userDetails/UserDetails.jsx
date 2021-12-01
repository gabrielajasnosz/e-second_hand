import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
    getUserData,
} from "../../page/userProfile/selectors";
import "./UserDetails.scss";
import "moment/locale/pl";
import TextButton from "../button/TextButton";
import { UserService } from "../../service/UserService";
import ChangeImageDialog from "./ChangeImageDialog";
// eslint-disable-next-line import/order
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModalContainer from "../modal/ModalContainer";
import EditProfile from "../editProfile/EditProfile";
import RatingCustom from "../rating/RatingCustom";
import { FollowerService } from "../../service/FollowerService";
import FollowDialog from "../followDialog/FollowDialog";

const styles = {
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "20px !important",
        "&:hover,&:focus": {
            outline: "none"
        }
    },
    followIcon: {
        color: "rgba(0, 0, 0, 0.54) !important",
        fontSize: "26px !important",
    },
    root: {
        padding: "0 !important",
        marginLeft: "3rem !important",
        color: "rgba(0, 0, 0, 0.54) !important",
        alignItems: "flex-start",
        fontSize: "30px !important",
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
    userData, classes, counters
}) => {
    // eslint-disable-next-line no-unused-vars
    const date = moment(userData.creationDate).locale("pl").format("DD MMM, YYYY");
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const isUsersProfile = isLoggedIn && UserService.decodedTokenValue.userId === userData.id;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [list, setList] = useState([]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const followUser = () => {
        FollowerService.addToFollowed(userData.id).then(() => {
            window.location.reload(true);
        });
    };

    const deleteFromFollowed = () => {
        FollowerService.deleteFromFollowed(userData.id).then(() => {
            window.location.reload(true);
        });
    };

    const createLabel = (label, counter) => (
        <div style={{
            display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"
        }}
        >
            <span style={{ fontWeigth: "bold", fontFamily: "Open Sans, sans-serif !important" }}>{label}</span>
            <div style={{
                marginLeft: "1rem",
                border: "1px #a5a58d solid",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: ".3rem",
                display: "flex",
                color: "#393938",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                {counter}
            </div>
        </div>
    );

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const { t } = useTranslation();

    const [usersModalOpen, setUsersModalOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [empty, setEmpty] = React.useState("");

    const handleUsersModalOpen = (context) => {
        if (context === "followers") {
            FollowerService.getFollowers(userData.id).then((response) => response.json()).then((json) => {
                if (json.length > 0) {
                    setList([...list, ...json]);
                }
                setTitle(t("Followers"));
                setEmpty(t("User has no followers"));
                setUsersModalOpen(true);
            });
        }
        if (context === "following") {
            FollowerService.getFollowing(userData.id).then((response) => response.json()).then((json) => {
                if (json.length > 0) {
                    setList([...list, ...json]);
                }
                setTitle(t("Following"));
                setEmpty(t("User has no followed users"));
                setUsersModalOpen(true);
            });
        }
    };
    // eslint-disable-next-line no-unused-vars
    const handleUsersModelClose = () => {
        setUsersModalOpen(false);
        setList([]);
    };

    return (
        <div className="user-info">
            <div className="user-details">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="edit-profile">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                showBadge={isUsersProfile}
                                badgeContent={(
                                    <IconButton onClick={handleDialogOpen} classes={{ root: classes.icon }}>
                                        {isUsersProfile && userData.profilePictureLocation === null && (
                                            <AddAPhotoIcon />
                                        )}
                                        {isUsersProfile && userData.profilePictureLocation !== null && (
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
                            <div style={{
                                marginLeft: "0.5rem", marginTop: "1rem", display: "flex", alignItems: "flex-start"
                            }}
                            >
                                { userData.rating && (
                                    <RatingCustom
                                        rating={userData.rating}
                                        readOnly
                                        precision={0.2}
                                    />
                                ) }
                            </div>
                        </div>
                        <div style={{ marginTop: "0.5rem" }}>
                            <TextButton onClick={() => handleUsersModalOpen("followers")}>
                                <span>{createLabel(t("Followers"), counters.followersCounter)}</span>
                            </TextButton>
                        </div>
                        <div style={{ marginTop: "0.5rem" }}>
                            <TextButton onClick={() => handleUsersModalOpen("following")}>
                                <span>{createLabel(t("Following"), counters.followingCounter)}</span>
                            </TextButton>
                        </div>
                        { isUsersProfile && (
                            <div style={{ marginTop: "0.5rem" }}>
                                <TextButton onClick={handleModalOpen}>
                                    <span>{t("Edit profile")}</span>
                                </TextButton>
                            </div>
                        ) }
                        { !isUsersProfile && (
                            <>
                                {!userData.followedByUser ? (
                                    <div style={{ marginTop: "1rem" }}>
                                        <Tooltip title={t("Add user to followed")}>
                                            <IconButton onClick={followUser} classes={{ root: classes.root }}>
                                                <PersonAddIcon className={classes.followIcon} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: "1rem" }}>
                                        <Tooltip title={t("Delete user from followed")}>
                                            <IconButton onClick={deleteFromFollowed} classes={{ root: classes.root }}>
                                                <PersonRemoveIcon className={classes.followIcon} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )}
                            </>
                        )}
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
                <Dialog
                    open={usersModalOpen}
                    onClose={handleUsersModelClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "25rem",
                            height: "25rem",
                            padding: "0 1rem",
                        }
                    }}
                >
                    <FollowDialog
                        list={list}
                        title={title}
                        emptyMessage={empty}
                    />
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
        rating: PropTypes.number,
        followedByUser: PropTypes.bool.isRequired
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        followIcon: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    counters: PropTypes.object.isRequired
};

export default enhance(UserDetails);
