//Constants

const SET_CURRENT = "SET_CURRENT_FILMS",
    GET_CURRENT = "GET_CURRENT_FILMS",
    SET_FAVORITES = "SET_FAVORITES_FILMS",
    DEL_FAVORITE = "DEL_FAVORITE",
    SET_DEFAULT_LIST = "SET_DEFAULT_LIST",
    LOGIN = "LOGIN",
    CLEAR_FAVORITE = "CLEAR_FAVORITE",
    LOGOUT = "LOGOUT";

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

function actionSetDefaultList(value) {
    return {
        type: SET_DEFAULT_LIST,
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

export {
    actionDeleteFavorite,
    actionGetCurrent,
    actionLoginUser,
    actionLogoutUser,
    actionSetCurrent,
    actionSetDefaultList,
    actionSetFavorites,
    actionClearFavorites
};
