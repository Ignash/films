import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import FilmById from "./FilmById";
import Search from "./Search";
import Header from "./Header";
import Page404 from "./Page404";
import Login from "./Login";
import EditPage from "./EditPage";
import FavoritsFilms from "./FavoritsFilms";
import FilmsPlaying from "./FilmsPlaying";

import RegistrationForm from "./RegistrationForm";
import { connect } from 'react-redux';

function RouterApp({user}) {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={FilmsPlaying} />
                <Route
                    path="/admin/edit"
                    render={() =>
                        user?.role === "admin" ? (
                            <EditPage />
                        ) : (
                            <Redirect to="/" />
                        )
                    }/>
                <Route path="/film/:id" component={FilmById} />
                <Route path="/search" component={Search} />
                <Route path="/page404" component={Page404} />
                <Route path="/login" component={Login} />
                <Route path="/favorits" component={FavoritsFilms} />
                <Route path="/registration" component={RegistrationForm} />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(RouterApp);
