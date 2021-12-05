import { authHeader, handleResponse } from "./helper";

function loadChat() {
    return fetch("http://localhost:8080/messages/all", {
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
//
// function subscribeOnNewMessages(onNewMessage) {
//     const stompClient = getOrCreateStompClient();
//     stompClient.connect({}, () => {
//         stompClient.subscribe("/topic/message", onNewMessage);
//     });
// }
//
// function postMessage({ receiverId, message }) {
//     const stompClient = getOrCreateStompClient();
//     const transaction = stompClient.begin();
//     stompClient.send("/messages/add", {}, JSON.stringify({
//         message,
//         receiverId
//     }));
//     transaction.commit();
// }

// eslint-disable-next-line import/prefer-default-export
export const MessageService = {
    loadMessages,
    loadChat
};
