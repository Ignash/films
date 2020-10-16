import { SET_FAVORITES, DEL_FAVORITE } from "../actions/actionTypes";
import initialState from "../initialState";

export default function favoriteFilmsReducer(state=initialState.favoriteFilms, action) {
    switch (action.type) {
    
        case SET_FAVORITES:
            return  [...state, action.payload];

        case DEL_FAVORITE:
            return  state.filter((item)=>item !== action.payload);

        default:
            return state;
    }
}