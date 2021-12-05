import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;

// eslint-disable-next-line import/prefer-default-export
export function getOrCreateStompClient() {
    if (stompClient) {
        return stompClient;
    }
    const socket = new SockJS("http://localhost:8080/chat");
    stompClient = Stomp.over(socket);
    return stompClient;
}
