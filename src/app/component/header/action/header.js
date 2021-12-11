import headerActions from "./headerActions";
import { CategoryService } from "../../../service/CategoryService";
import { MessageService } from "../../../service/MessageService";

export const setCategories = (categories) => ({
    type: headerActions.setCategories,
    categories
});

export const setBrands = (brands) => ({
    type: headerActions.setBrands,
    brands
});

export const setChat = (chat) => ({
    type: headerActions.setChat,
    chat
});

export const setMessages = (messages) => ({
    type: headerActions.setMessages,
    messages
});

export const setSizes = (sizes) => ({
    type: headerActions.setSizes,
    sizes
});
export const setColors = (colors) => ({
    type: headerActions.setColors,
    colors
});
export const setUnreadCounter = (unreadCounter) => ({
    type: headerActions.setUnreadCounter,
    unreadCounter
});

export const fetchChat = () => (dispatch) => {
    MessageService.loadChat()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setChat(json));
        });
};

export const fetchUnreadCounter = () => (dispatch) => {
    MessageService.getUnreadCounter()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setUnreadCounter(json));
        });
};

export const fetchMessages = (chatId) => (dispatch) => {
    MessageService.loadMessages(chatId)
        .then((response) => response.json())
        .then((json) => {
            dispatch(setMessages(json));
        });
};

export const fetchCategories = () => (dispatch) => {
    CategoryService.getCategories()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setCategories(json));
        });
};

export const fetchSizes = () => (dispatch) => {
    CategoryService.getSizes()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setSizes(json));
        });
};

export const fetchBrands = () => (dispatch) => {
    CategoryService.getBrands()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setBrands(json));
        });
};

export const fetchColors = () => (dispatch) => {
    CategoryService.getColors()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setColors(json));
        });
};
