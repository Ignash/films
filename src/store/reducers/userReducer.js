import { LOGIN, LOGOUT } from "../actions/actionTypes";
import initialState from "../initialState";

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case LOGOUT:
        case LOGIN:
            return action.payload;

        default:
            return state;
    }
}
