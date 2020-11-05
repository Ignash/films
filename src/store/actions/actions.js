import {
    SET_CURRENT,
    SET_HEADER_COLOR,
    SET_FAVORITES,
    DEL_FAVORITE,
    CLEAR_FAVORITE,
    GET_CURRENT,
    LOGOUT,
    LOGIN,
    SET_IS_AUTH
} from "./actionTypes";

//Actions

function actionDeleteFavorite(value) {
    return {
        type: DEL_FAVORITE,
        payload: value,
    };
}

function actionGetCurrent(url) {
    return {
        type: GET_CURRENT,
        payload: url,
    };
}

function actionLoginUser(value) {
    return {
        type: LOGIN,
        payload: value,
    };
}

function actionLogoutUser() {
    document.cookie = "";
    return {
        type: LOGOUT,
        payload: { name: null, status: null },
    };
}

function actionSetCurrent(value) {
    return {
        type: SET_CURRENT,
        payload: value,
    };
}

function actionSetHeaderColor(value) {
    return {
        type: SET_HEADER_COLOR,
        payload: value,
    };
}

function actionSetFavorites(value) {
    const currentArr = JSON.parse(localStorage.getItem("favorits"));
    localStorage.setItem("favorits", JSON.stringify([...currentArr, value]));
    return {
        type: SET_FAVORITES,
        payload: value,
    };
}
function actionClearFavorites() {
    return {
        type: CLEAR_FAVORITE
    };
}
function actionIsAuth(value) {
    return {
        type: SET_IS_AUTH,
        payload: value
    };
}

export {
    actionDeleteFavorite,
    actionGetCurrent,
    actionLoginUser,
    actionLogoutUser,
    actionSetCurrent,
    actionSetHeaderColor,
    actionSetFavorites,
    actionClearFavorites,
    actionIsAuth
};
