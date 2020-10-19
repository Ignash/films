const { LOGOUT } = require("./actionTypes");

export default function actionLogoutUser(){
    return{
        type: LOGOUT,
        payload: {name: null, password: null, status: null}
    }
}