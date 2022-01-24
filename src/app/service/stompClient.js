import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;

// eslint-disable-next-line import/prefer-default-export
export function getOrCreateStompClient() {
    if (stompClient) {
        return stompClient;
    }
    // eslint-disable-next-line no-useless-concat
    const socket = new SockJS("http://localhost:8080/chat", null, { transports: "websocket" });
    stompClient = Stomp.over(socket);
    return stompClient;
}
