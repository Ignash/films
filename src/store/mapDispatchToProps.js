import { bindActionCreators } from "redux";
import actionDeleteFavorite from './actions/actionDeleteFavorite'
import actionSetFavorites from './actions/actionSetFavorites'
import actionLogoutUser from './actions/actionLogoutUser'


export default function mapDispatchToProps(component){
    switch (component) {
        case 'FilmItem':{
            return function (dispatch){
                return {
                    delFavorite: bindActionCreators(actionDeleteFavorite, dispatch),
                    addFavorite: bindActionCreators(actionSetFavorites, dispatch),
                }
            }
        }
        case 'Header':{
            return function (dispatch){
                return {
                    logoutUser: bindActionCreators(actionLogoutUser, dispatch)
                }
            }
        }
    
        default:
            break;
    }
}