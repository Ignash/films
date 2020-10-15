import React, { useState, useEffect, useRef, useContext } from "react";
import FilmList from "./FilmList";
import { API_KEY } from "../const";
import Loader from "./Loader";
import { InputField } from "../styled_component/InputField";
import { DefaultListFilmsContext } from "../context/contexts";

export default function FilmsPlaying() {

    const {defaultListFilms} = useContext(DefaultListFilmsContext)
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1);
    const [currentUrlFetch, setCurrentUrlFetch] = useState(
        `https://api.themoviedb.org/3/movie/${defaultListFilms}?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const refInput = useRef("");

    let searchInAction = false;
    let delay = 1000;

    const changePage = (page) => {
        setPage(page);
    };

    const handlerSearch = () => {
        if (searchInAction) return;
        if (refInput.current.value.length > 0) {
            searchInAction = true;
            return setTimeout(() => {
                if (!refInput.current.value.length) {
                    setFilms([]);
                    return;
                }

                setCurrentUrlFetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${refInput.current.value.replace(
                        /\W/g,
                        "%20"
                    )}&include_adult=false&page=1`
                );

                searchInAction = false;
            }, delay);
        }
    };
    useEffect(
        (prevP) => {
            setCurrentUrlFetch((prev) => {
                let index = prev.lastIndexOf("page=") + 5;
                let currUrl = prev.split("");
                currUrl.splice(index, prev.length, page);
                return currUrl.join("");
            });
        },
        [page]
    );

    useEffect(() => {
        refInput.current.focus();
        fetch(currentUrlFetch)
            .then((response) => response.json())
            .then((filmsData) => {
                setFilms(filmsData);
            });
    }, [currentUrlFetch]);

    return (
        <>
            <section>
                <InputField
                    ref={refInput}
                    type="text"
                    onChange={handlerSearch}
                />
            </section>
            {films.results?.length ? (
                <FilmList films={films} changePage={changePage} />
            ) : (
                <Loader />
            )}
        </>
    );
}
