import React, { useMemo } from "react";
import "./ChatPage.scss";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getChatData, getMessages } from "../../component/header/selectors";
import { UserService } from "../../service/UserService";
import StandardInput from "../../component/input/StandardInput";

const mapStateToProps = (state) => ({
    chatData: getChatData(state),
    messages: getMessages(state)
});

const enhance = compose(
    connect(mapStateToProps,
        null)
);

// eslint-disable-next-line no-unused-vars
const ChatPage = ({ chatData, messages }) => {
    const { id } = useParams();

    const chat = useMemo(() => chatData.filter((e) => e.chatId.toString() === id),
        [chatData, id]);

    const userId = UserService.validateToken(UserService.currentUserValue) ? UserService.decodedTokenValue.userId : null;

    return (
        <div className="chat-page-container">
            <div className="chat-page-content">
                {console.log(chat[0])}
                <Avatar
                    src={`http://localhost:8080/user/profile-picture/${chat[0].conversationalistId}`}
                    alt={<PersonRoundedIcon className="avatar-icon " />}
                    sx={{ width: 50, height: 50, marginRight: "1rem" }}
                />
                <span className="author">{chat[0].conversationalist}</span>
            </div>
            <div className="messages-container">

                {messages.map((m) => (
                    <div style={{ width: "100%", display: "flex", justifyContent: m.authorId === userId ? "flex-end" : "flex-start" }}>
                        <div className={m.authorId === userId ? "my-message" : "other-message"}>{m.content}</div>
                    </div>
                ))}
            </div>
            <div className="input-field">
                <StandardInput label="Send message" onChange={() => {}} defaultValue="" variant="standard" />
            </div>
        </div>
    );
};

ChatPage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    chatData: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    messages: PropTypes.array.isRequired
};

export default enhance(ChatPage);
