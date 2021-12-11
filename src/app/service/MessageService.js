import { authHeader, handleResponse } from "./helper";
import { getOrCreateStompClient } from "./stompClient";
import { UserService } from "./UserService";

function loadChat() {
    return fetch("http://localhost:8080/messages/all", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getUnreadCounter() {
    return fetch("http://localhost:8080/messages/unread-counter", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function loadMessages(chatId) {
    return fetch(`http://localhost:8080/messages/chat?chatId=${encodeURIComponent(chatId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line no-unused-vars
function subscribeOnNewMessages(onNewMessage) {
    const stompClient = getOrCreateStompClient();
    const headers = {
        Authorization: `Bearer ${UserService.currentUserValue}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    };
    stompClient.connect(headers, () => {
        // eslint-disable-next-line max-len
        stompClient.subscribe(headers, "/topic/message", onNewMessage);
    });
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        // eslint-disable-next-line consistent-return
        return value;
    };
};

function postMessage({ content, receiver, chat }) {
    const stompClient = getOrCreateStompClient();
    const transaction = stompClient.begin();
    stompClient.send("/ws/messages/add", {}, JSON.stringify({
        receiverId: receiver,
        chatId: chat,
        message: content
    }, getCircularReplacer()));
    transaction.commit();
}

// eslint-disable-next-line import/prefer-default-export
export const MessageService = {
    loadMessages,
    loadChat,
    postMessage,
    subscribeOnNewMessages,
    getUnreadCounter
};
