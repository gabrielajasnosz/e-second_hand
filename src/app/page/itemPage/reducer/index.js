import itemActions from "../action/itemActions";

export const initialState = {
    item: {},
};

const item = (state = initialState, action) => {
    switch (action.type) {
        case itemActions.setItem: {
            return {
                ...state,
                item: action.item
            };
        }

        default:
            return state;
    }
};

export default item;
