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
    userId: null
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

        default:
            return state;
    }
};

export default userProfile;
