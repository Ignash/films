import { LOGIN } from './actionTypes';

export default function actionLoginUser(value){
    return {
        type: LOGIN,
        payload: value
    }
}