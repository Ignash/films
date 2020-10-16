import { combineReducers } from "redux";
import currentFilmsReducer from "./currentFilmsReducer";
import favoriteFilmsReducer from "./favoriteFilmsReducer";
import userReducer from "./userReducer";
import defaultListReducer from "./defaultListReducer"

const rootReducer = combineReducers({
    currentFilms: currentFilmsReducer,
    favoriteFilms: favoriteFilmsReducer,
    user: userReducer,
    defaultListFilms: defaultListReducer,
});

export default rootReducer;
