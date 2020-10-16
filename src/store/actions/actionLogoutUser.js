const { SET_USER } = require("./actionTypes");

export default function actionLogoutUser(){
    localStorage.clear();
    return{
        type: SET_USER,
        payload: {name: null, password: null, status: null}
    }
}