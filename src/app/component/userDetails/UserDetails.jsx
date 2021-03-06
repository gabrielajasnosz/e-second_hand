import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
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
import EmailIcon from "@mui/icons-material/Email";
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
import EditProfile from "../editProfileModalContent/EditProfile";
import RatingCustom from "../rating/RatingCustom";
import { FollowerService } from "../../service/FollowerService";
import FollowDialog from "../followDialog/FollowDialog";

import {
    fetchMessages as fetchMessagesActionCreator,
    fetchChat as fetchChatActionCreator
} from "../header/action/header";
import SendNewMessageDialog from "./SendNewMessageDialog";
import { MessageService } from "../../service/MessageService";

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
        padding: "6px 8px !important",
        marginLeft: "1rem !important",
        color: "rgba(0, 0, 0, 0.54) !important",
        alignItems: "flex-start",
        fontSize: "30px !important",
        "&:hover,&:focus": {
            outline: "none"
        }
    },
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMessages: fetchMessagesActionCreator,
    fetchChat: fetchChatActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    userData: getUserData(state),
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

const UserDetails = ({
// eslint-disable-next-line no-unused-vars
    userData, classes, counters, history, fetchMessages, fetchChat
}) => {
    // eslint-disable-next-line no-unused-vars
    const date = moment(userData.creationDate).locale("pl").format("DD MMM, YYYY");
    const isLoggedIn = UserService.validateToken(UserService.currentUserValue);
    const isUsersProfile = isLoggedIn && UserService.decodedTokenValue.userId === userData.id;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [newMessageDialog, setNewMessageDialog] = React.useState(false);
    const [list, setList] = useState([]);

    const userRole = localStorage.getItem("role");

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleMessageDialogOpen = () => {
        setNewMessageDialog(true);
    };

    const handleMessageDialogClose = () => {
        setNewMessageDialog(false);
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

    useEffect(() => {
        if (UserService.validateToken(UserService.currentUserValue) && userRole === "USER") {
            MessageService.subscribeNewChatCreated(UserService.decodedTokenValue.userId, (chat) => {
                const body = JSON.parse(chat.body);
                window.location.href = `/chat/${body.id}`;
            });
        }
    }, [history, isUsersProfile, userRole]);

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
                <div style={{
                    display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around"
                }}
                >
                    <div className="edit-profile">
                        <div style={{
                            display: "flex", flexDirection: "row"
                        }}
                        >
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
                                        src={`http://localhost:8080/users/profile-picture/${userData.id}`}
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
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: "0.5rem"
                        }}
                        >
                            <TextButton onClick={() => handleUsersModalOpen("followers")}>
                                <span>{createLabel(t("Followers"), counters.followersCounter)}</span>
                            </TextButton>
                            <TextButton onClick={() => handleUsersModalOpen("following")}>
                                <span>{createLabel(t("Following"), counters.followingCounter)}</span>
                            </TextButton>
                            { isUsersProfile && (
                            <TextButton onClick={handleModalOpen}>
                                <span>{t("Edit profile")}</span>
                            </TextButton>
                            ) }
                            { !isUsersProfile && userRole === "USER" && (
                                <>
                                    {!userData.followedByUser ? (
                                        <Tooltip title={t("Add user to followed")}>
                                            <IconButton onClick={followUser} classes={{ root: classes.root }}>
                                                <PersonAddIcon className={classes.followIcon} />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={t("Delete user from followed")}>
                                            <IconButton onClick={deleteFromFollowed} classes={{ root: classes.root }}>
                                                <PersonRemoveIcon className={classes.followIcon} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </>
                            )}
                            { !isUsersProfile && userRole === "USER" && (
                            <Tooltip title={t("Send message")}>
                                <IconButton
                                    onClick={() => {
                                        if (userData.chatWithUserId) {
                                            fetchMessages(userData.chatWithUserId);
                                            window.location.href = `/chat/${userData.chatWithUserId}`;
                                        } else {
                                            handleMessageDialogOpen();
                                        }
                                    }}
                                    classes={{ root: classes.root }}
                                >
                                    <EmailIcon className={classes.followIcon} />
                                </IconButton>
                            </Tooltip>
                            )}
                        </div>
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
                        }
                    }}
                >
                    <ChangeImageDialog handleClose={handleDialogClose} />
                </Dialog>
                <Dialog
                    open={newMessageDialog}
                    onClose={handleMessageDialogClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "25rem",
                            height: "13rem",
                        }
                    }}
                >
                    <SendNewMessageDialog
                        receiverId={userData.id}
                        handleClose={handleMessageDialogClose}
                        history={history}
                        fetchMessages={fetchMessages}
                    />
                </Dialog>
                <Dialog
                    open={usersModalOpen}
                    onClose={handleUsersModelClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F0EFEB",
                            width: "25rem",
                            height: "25rem",
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
        followedByUser: PropTypes.bool.isRequired,
        chatWithUserId: PropTypes.number
    }).isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        followIcon: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    counters: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    fetchChat: PropTypes.func.isRequired
};

export default enhance(UserDetails);
