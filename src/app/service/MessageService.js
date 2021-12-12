import { authHeader, handleResponse } from "./helper";
import { getOrCreateStompClient } from "./stompClient";
import { UserService } from "./UserService";

function loadChat() {
    return fetch("http://localhost:8080/chat/all", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getUnreadCounter() {
    return fetch("http://localhost:8080/chat/unread-counter", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function loadMessages(chatId) {
    return fetch(`http://localhost:8080/chat/chat?chatId=${encodeURIComponent(chatId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line no-unused-vars
function subscribeOnNewMessages(onNewMessage) {
    const stompClient = getOrCreateStompClient();
    const headers = {
        "x-auth-token": `${UserService.currentUserValue}`,
    };
    stompClient.connect(headers, () => {
        // eslint-disable-next-line max-len
        stompClient.subscribe("/topic/message", onNewMessage);
    });
}
//
// const getCircularReplacer = () => {
//     const seen = new WeakSet();
//     return (key, value) => {
//         if (typeof value === "object" && value !== null) {
//             seen.add(value);
//         }
//         // eslint-disable-next-line consistent-return
//         return value;
//     };
// };

function postMessage({
    content, receiver, chat, author
}) {
    const stompClient = getOrCreateStompClient();
    const transaction = stompClient.begin();
    const headers = {
        "x-auth-token": `${UserService.currentUserValue}`,
    };
    stompClient.send("/add", headers, JSON.stringify({
        receiverId: receiver,
        chatId: chat,
        message: content,
        authorId: author
    }));
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
