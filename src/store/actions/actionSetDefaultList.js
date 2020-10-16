const { SET_DEFAULT_LIST } = require("./actionTypes");

export default function actionSetDefaultList(value){
    return {
        type: SET_DEFAULT_LIST,
        payload: value
    }
}