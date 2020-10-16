import { SET_USER } from './actionTypes';

export default function actionSetUser(value){
    return {
        type: SET_USER,
        payload: value
    }
}