import React, { useEffect, useState } from "react";
import "./ChatPage.scss";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useParams } from "react-router";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import withStyles from "@material-ui/core/styles/withStyles";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import { UserService } from "../../service/UserService";
import StandardInput from "../../component/input/StandardInput";
import { MessageService } from "../../service/MessageService";
import {
    fetchUnreadCounter as fetchUnreadCounterActionCreator,
    fetchChat as fetchChatActionCreator
} from "../../component/header/action/header";

const styles = {
    icon: {
        marginLeft: "1rem",
        width: "3rem",
        height: "3rem",
        "&:hover, &:focus": {
            outline: "none",
        }
    },
    iconStyle: {
        color: "#ddbea9 !important",
        "&:hover, &:focus": {
            outline: "none",
            color: "#cb997e !important",
        }
    },
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUnreadCounter: fetchUnreadCounterActionCreator,
    fetchChat: fetchChatActionCreator
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

const ChatPage = ({
    classes, fetchUnreadCounter, fetchChat
}) => {
    const { id } = useParams();

    const userId = UserService.validateToken(UserService.currentUserValue) ? UserService.decodedTokenValue.userId : null;

    const [messageContent, setMessageContent] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatData, setChatData] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (id != null) {
            MessageService.loadMessages(id).then((response) => response.json()).then((e) => {
                setChatData({ chatUserId: e.chatUserId, chatUserName: e.chatUserName });
                setMessages(e.messageDtoList);
                fetchUnreadCounter();
                fetchChat();
            });
        }
    }, [fetchChat, fetchUnreadCounter, id]);

    useEffect(() => {
        if (id != null && isConnected === false) {
            MessageService.subscribeOnNewMessages(id, (message) => {
                // eslint-disable-next-line no-debugger
                setIsConnected(true);
                const body = JSON.parse(message.body);
                setMessages((oldMessages) => [...oldMessages, ...body]);
            });
        }
    }, [id, isConnected, messages]);

    const sendMessage = () => {
        const content = messageContent;
        const receiver = messages.chatUserId;
        const chat = id;
        const author = userId;
        MessageService.postMessage({
            content, receiver, chat, author
        });
        setMessageContent("");
    };

    return (
        <div className="chat-page-container">
            <div className="chat-page-content">
                { chatData && chatData.chatUserId && chatData.chatUserName && (
                    <>
                        <Avatar
                            src={`http://localhost:8080/users/profile-picture/${chatData.chatUserId}`}
                            alt={<PersonRoundedIcon className="avatar-icon " />}
                            sx={{ width: 50, height: 50, marginRight: "1rem" }}
                        />
                        <span className="author">{chatData.chatUserName}</span>
                    </>
                )}
            </div>
            <div className="messages-container">

                {messages.map((m) => (
                    <div style={{ width: "100%", display: "flex", justifyContent: m.authorId === userId ? "flex-end" : "flex-start" }}>
                        <div className={m.authorId === userId ? "my-message" : "other-message"}>{m.content}</div>
                    </div>
                ))}
            </div>
            <div className="input-field">
                <StandardInput label="Send message" onChange={(e) => setMessageContent(e.target.value)} defaultValue="" />
                <IconButton
                    onClick={sendMessage}
                    size="small"
                    classes={{ root: classes.icon }}
                    disabled={messageContent === null || messageContent === ""}
                >
                    <SendIcon className={classes.iconStyle} />
                </IconButton>
            </div>
        </div>
    );
};

ChatPage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        iconStyle: PropTypes.string.isRequired
    }).isRequired,
    fetchUnreadCounter: PropTypes.func.isRequired,
    fetchChat: PropTypes.func.isRequired
};

export default enhance(ChatPage);
