import { combineReducers } from "redux";
export const actionType = {
    SET_USER: "SET_USER",
    SET_POST_ITEMS: "SET_POST_ITEMS",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_POST_ITEMS:
            return {
                ...state,
                postItems: action.postItems,
            };
        default:
            return state;
    }
};

export default reducer;
