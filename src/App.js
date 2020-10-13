import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { API_KEY } from "./const";
import "./App.css";
import FilmList from "./components/FilmList";
import FilmById from "./components/FilmById"
import Search from "./components/Search"
import Header from "./components/Header";


function App() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        )
            .then((response) => response.json())
            .then((filmsData) => {
                setFilms(filmsData.results);
            });
    }, []);
    return (
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <FilmList films={films} />
          </Route>
          <Route path="/film/:id">
            <FilmById />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>

      </Router>
      );
}

export default App;
