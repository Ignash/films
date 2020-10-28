import { combineReducers } from "redux";
import getCookie from "../utils/getCookie";

import {
    SET_CURRENT,
    SET_DEFAULT_LIST,
    SET_FAVORITES,
    DEL_FAVORITE,
    CLEAR_FAVORITE,
    LOGOUT,
    LOGIN
} from "./actions/actionTypes";

const initialState = {
    currentFilms: [],
    favoriteFilms: JSON.parse(localStorage.getItem("favorits")) || [],
    defaultListFilms: "now_playing",
    user: {name: getCookie("name"), status: getCookie("status")} || {name: null, status: null}
}
const rootReducer = combineReducers({
    currentFilms,
    favoriteFilms,
    user,
    defaultListFilms,
});

function currentFilms(state = initialState.currentFilms, action) {
    switch (action.type) {
        case SET_CURRENT:
            return action.payload;

        default:
            return state;
    }
}

function defaultListFilms(state = initialState.defaultListFilms, action) {
    switch (action.type) {
        case SET_DEFAULT_LIST:
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

export default rootReducer;
