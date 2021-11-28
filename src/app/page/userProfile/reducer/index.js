import userProfileActions from "../action/userProfileActions";

export const initialState = {
    user: {
        id: null,
        email: null,
        displayName: null,
        phoneNumber: null,
        city: null,
        zipCode: null,
        creationDate: null,
        gender: null,
        profilePictureLocation: null,
        userItemsList: []
    },
    nextItemId: null,
    nextItemValue: null,
    itemsLoading: false,
    userItemsList: [],
    userCommentsList: [],
    commentsLoading: false,
    commentsPage: 0,
    userId: null,
    hasMoreComments: true
};

const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case userProfileActions.setUser: {
            return {
                ...state,
                user: action.user
            };
        }
        case userProfileActions.setNextItemId: {
            return {
                ...state,
                nextItemId: action.nextItemId
            };
        }
        case userProfileActions.setNextItemValue: {
            return {
                ...state,
                nextItemValue: action.nextItemValue
            };
        }
        case userProfileActions.setUserItemsList: {
            return {
                ...state,
                userItemsList: [...state.userItemsList, ...action.userItemsList]
            };
        }
        case userProfileActions.setItemsLoading: {
            return {
                ...state,
                itemsLoading: action.itemsLoading
            };
        }
        case userProfileActions.setUserId: {
            return {
                ...state,
                userId: action.userId
            };
        }
        case userProfileActions.setUserCommentsList: {
            return {
                ...state,
                userCommentsList: [...state.userCommentsList, ...action.userCommentsList]
            };
        }
        case userProfileActions.setCommentsLoading: {
            return {
                ...state,
                commentsLoading: action.commentsLoading
            };
        }
        case userProfileActions.setCommentsPage: {
            return {
                ...state,
                commentsPage: action.commentsPage
            };
        }
        case userProfileActions.setHasMoreComments: {
            return {
                ...state,
                hasMoreComments: action.hasMoreComments
            };
        }
        case userProfileActions.resetData: {
            return {
                ...state,
                user: {
                    id: null,
                    email: null,
                    displayName: null,
                    phoneNumber: null,
                    city: null,
                    zipCode: null,
                    creationDate: null,
                    gender: null,
                    profilePictureLocation: null,
                    userItemsList: []
                },
                nextItemId: null,
                nextItemValue: null,
                itemsLoading: false,
                userItemsList: [],
                userCommentsList: [],
                commentsLoading: false,
                commentsPage: 0,
                userId: null,
                hasMoreComments: true
            };
        }

        default:
            return state;
    }
};

export default userProfile;
