import React, { useState, useEffect } from "react";
import { API_KEY } from "./const";
import "./App.css";
import FilmList from "./components/FilmList";

function App() {
    const [films, setFilms] = useState([]);
    /*image
    https://image.tmdb.org/t/p/w220_and_h330_face/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg
    w600_and_h900_bestv2
    w300_and_h450_bestv2
  */

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        )
            .then((response) => response.json())
            .then((filmsData) => {
                console.log(filmsData.results);
                console.log(filmsData.results.map((item) => item.id));
                setFilms(filmsData.results);
            });
    }, []);
    return <FilmList films={films} />;
}

export default App;
