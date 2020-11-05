import { combineReducers } from "redux";
import Cookies from "js-cookie"

import {
    SET_CURRENT,
    SET_HEADER_COLOR,
    SET_FAVORITES,
    DEL_FAVORITE,
    CLEAR_FAVORITE,
    LOGOUT,
    LOGIN,
    SET_IS_AUTH
} from "./actions/actionTypes";

const initialState = {
    currentFilms: [],
    favoriteFilms: JSON.parse(localStorage.getItem("favorits")) || [],
    headerColor: "#8ae6fd",
    user:  Cookies.getJSON("user") || null,
    isAuth: false
}
const rootReducer = combineReducers({
    currentFilms,
    favoriteFilms,
    user,
    headerColor,
    isAuth
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
            return [...state, action.payload];

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
