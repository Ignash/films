import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { API_KEY } from "../const";
import FilmList from "./FilmList";

const SectionSearch = styled.section`
    input {
        width: 330px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        display: block;
        margin: 30px auto;
        padding: 0 10px;
    }
`;
const Nothing = styled.p`
    text-align: center;
    font-size: 2rem;
`;

export default function Search() {
    const refInput = useRef("");
    const [searchResult, setSearchResult] = useState([]);

    let searchInAction = false;
    let delay = 1000;

    const handlerSearch = () => {
        if (searchInAction) return;
        if (refInput.current.value.length > 0) {
            searchInAction = true;
            return setTimeout(() => {
                if (!refInput.current.value.length) {
                    setSearchResult([]);
                    return;
                }
                fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${refInput.current.value.replace(/\W/g, "%20")}&page=1&include_adult=false`
                )
                    .then((response) => response.json())
                    .then((searchData) => {
                        setSearchResult(searchData);
                    });
                searchInAction = false;
            }, delay);
        }
    };

    useEffect((prev) => {
        refInput.current.focus();
    }, []);

    return (
        <>
            <SectionSearch>
                <input ref={refInput} type="text" onChange={handlerSearch} />
            </SectionSearch>
            {searchResult?.length > 0 ? (
                <FilmList films={searchResult} />
            ) : (
                <Nothing>Nothing found</Nothing>
            )}
        </>
    );
}
