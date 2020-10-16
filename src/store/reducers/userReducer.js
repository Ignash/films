import {SET_USER} from '../actions/actionTypes'
import initialState from '../initialState'

export default function userReducer(state=initialState.user, action){
    switch (action.type) {
        case SET_USER:
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("favorits", JSON.stringify([]));
            return action.payload;

        default: return state;
    }
}