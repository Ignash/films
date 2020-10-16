import actionSetCurrent from './actionSetCurrent'

export default function actionGetCurrent(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                dispatch(actionSetCurrent(data));
            });
    };
}
