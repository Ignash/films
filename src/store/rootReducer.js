import { combineReducers } from "redux";

import {
    SET_CURRENT,
    SET_HEADER_COLOR,
    SET_FAVORITES,
    DEL_FAVORITE,
    CLEAR_FAVORITE,
    LOGOUT,
    LOGIN,
    SET_IS_AUTH,
    SET_INIT_STATE
} from "./actions/actionTypes";

let initialState = {
    currentFilms: [],
    favoriteFilms: [],
    headerColor: "#8ae6fd",
    user: null,
    isAuth: false,
};

const rootReducer = combineReducers({
    currentFilms,
    favoriteFilms,
    user,
    headerColor,
    isAuth,
});

function currentFilms(state = initialState.currentFilms, action) {
    switch (action.type) {
        case SET_CURRENT:
            return action.payload;

        default:
            return state;
    }
}

function headerColor(state = initialState.headerColor, action) {
    switch (action.type) {
        case SET_HEADER_COLOR:
            return action.payload;

        default:
            return state;
    }
}

function favoriteFilms(state = initialState.favoriteFilms, action) {
    switch (action.type) {
        case SET_FAVORITES:
            return action.payload;

        case SET_INIT_STATE:
            return action.payload.favoriteFilms

        case DEL_FAVORITE:
            return state.filter((item) => item !== action.payload);

        case CLEAR_FAVORITE:
            return [];

        default:
            return state;
    }
}

function user(state = initialState.user, action) {
    switch (action.type) {
        case LOGOUT:
        case LOGIN:
            return action.payload;

        case SET_INIT_STATE:
            return action.payload.user
        default:
            return state;
    }
}

function isAuth(state = initialState.isAuth, action) {
    switch (action.type) {
        case SET_IS_AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default rootReducer;
