export default function mapStateToProps(component) {
    switch (component) {
        case "FavoritsFilms":
            {
                return function (state) {
                    return {
                        favoriteFilms: state.favoriteFilms,
                        user: state.user
                    };
                };
            }

        case "FilmsPlaying":
            {
                return function (state) {
                    return {
                        currentFilms: state.currentFilms,
                    };
                };
            }
        case "App":
        case "Header":
            {
                return function (state) {
                    return {
                        user: state.user,
                    };
                };
            }

        default:
            return undefined;
    }
}
// 
