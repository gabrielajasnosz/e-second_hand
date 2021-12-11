import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import { UserService } from "../../service/UserService";

const styles = {
    message: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "10px !important",
    },
    messageNotSeen: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "10px !important",
        fontWeight: "bold !important"
    },
    userName: {
        textTransform: "capitalize",
        color: "black !important",
        fontFamily: "Open Sans, sans-serif !important",
        fontSize: "14px !important",
    },
    root: {
        // height: "auto",
        // maxHeight: "20rem",
        // overflow: "auto",
        height: "100%",
        backgroundColor: "#F0EFEB"
    }
};

const MessagessContainer = ({
    classes, chat, history, fetchMessages
}) => {
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation();
    const userId = UserService.validateToken(UserService.currentUserValue) ? UserService.decodedTokenValue.userId : null;
    return (
        <>
            { chat.length > 0 ? (
                <List classes={{ root: classes.root }}>
                    <>
                        {chat.map((e) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    disableRipple
                                    onClick={() => {
                                        fetchMessages(e.chatId);
                                        history.push(`/chat/${e.chatId}`);
                                    }}
                                >
                                    <Avatar
                                        src={`http://localhost:8080/users/profile-picture/${e.conversationalistId}`}
                                        sx={{ width: "50px", height: "50px", marginRight: "0.5rem" }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="body1" className={classes.userName}>{e.conversationalist}</Typography>}
                                        />
                                        {userId === e.lastMessageAuthorId ? (
                                            <ListItemText
                                                disableTypography
                                                primary={(
                                                    <Typography
                                                        variant="body2"
                                                        className={classes.message}
                                                    >
                                                        {t("You")}
                                                        :
                                                        {" "}
                                                        {e.lastMessage}
                                                    </Typography>
)}
                                            />
                                        ) : (
                                            <ListItemText
                                                disableTypography
                                                primary={(
                                                    <Typography
                                                        variant="body2"
                                                        className={e.lastMessageSeen ? classes.message : classes.messageNotSeen}
                                                    >
                                                        {e.lastMessage}
                                                    </Typography>
)}
                                            />
                                        )}

                                    </div>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </>
                </List>
            ) : (
                <div style={{
                    height: "6rem", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F0EFEB"
                }}
                >
                    <span className="no-content-info">{t("No chats yet")}</span>
                </div>
            )}

        </>
    );
};

MessagessContainer.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        messageNotSeen: PropTypes.string.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    chat: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    fetchMessages: PropTypes.func.isRequired
};

export default withStyles(styles)(MessagessContainer);
