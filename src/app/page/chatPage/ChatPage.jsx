import React, { useMemo, useState } from "react";
import "./ChatPage.scss";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { useParams } from "react-router";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import withStyles from "@material-ui/core/styles/withStyles";
import { bindActionCreators } from "redux";
import { getChatData, getMessages } from "../../component/header/selectors";
import { UserService } from "../../service/UserService";
import StandardInput from "../../component/input/StandardInput";
import { MessageService } from "../../service/MessageService";
import { setMessages as setMessagesActionCreator } from "../../component/header/action/header";

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
    setMessages: setMessagesActionCreator,
}, dispatch);

const mapStateToProps = (state) => ({
    chatData: getChatData(state),
    messages: getMessages(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
    withStyles(styles)
);

// eslint-disable-next-line no-unused-vars
const ChatPage = ({
// eslint-disable-next-line no-unused-vars
    chatData, messages, classes, setMessages
}) => {
    const { id } = useParams();

    const chatId = useMemo(() => chatData.filter((e) => e.chatId.toString() === id),
        [chatData, id]);

    const userId = UserService.validateToken(UserService.currentUserValue) ? UserService.decodedTokenValue.userId : null;

    const [messageContent, setMessageContent] = useState("");

    const sendMessage = () => {
        const content = messageContent;
        const receiver = chatData[0].conversationalistId;
        const chat = chatData[0].chatId;
        const author = userId;
        MessageService.postMessage({
            content, receiver, chat, author
        });
    };

    return (
        <div className="chat-page-container">
            <div className="chat-page-content">
                <Avatar
                    src={`http://localhost:8080/users/profile-picture/${chatId[0].conversationalistId}`}
                    alt={<PersonRoundedIcon className="avatar-icon " />}
                    sx={{ width: 50, height: 50, marginRight: "1rem" }}
                />
                <span className="author">{chatId[0].conversationalist}</span>
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
                <IconButton onClick={sendMessage} size="small" classes={{ root: classes.icon }} disabled={messageContent === null}>
                    <SendIcon className={classes.iconStyle} />
                </IconButton>
            </div>
        </div>
    );
};

ChatPage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    chatData: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    messages: PropTypes.array.isRequired,
    classes: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        iconStyle: PropTypes.string.isRequired
    }).isRequired,
    setMessages: PropTypes.func.isRequired
};

export default enhance(ChatPage);
