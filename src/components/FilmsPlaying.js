import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import Loader from "./Loader";
import { actionGetCurrent } from "../store/actions/actions.js";
import { connect, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Sorting from "./Sorting";
import Search from "./Search";

const NotFound = styled.p`
    text-align: center;
    font-size: 2rem;
    margin: 50px 0;
`;

function FilmsPlaying({ currentFilms }) {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState();
    const [searchText, setSearchText] = useState([]);

    const changePage = (page) => {
        setPage(page);
    };
    const changeSorting = (sort) => {
        setSort(`${sort}`);
    };

    const changeSearch = (value) => {
        setSearchText(value.join(","));
    };

    useEffect(() => {
        dispatch(actionGetCurrent({ page, sort, searchText }));
    }, [page, sort]);

    useEffect(() => {
        dispatch(actionGetCurrent({ page: 1, sort, searchText }));
    }, [searchText]);

    return (
        <>
            <section>
                <Search changeSearch={changeSearch} />
                <Sorting changeSorting={changeSorting} />
            </section>
            {currentFilms.results ? (
                currentFilms.results?.length > 0 ? (
                    <FilmList films={currentFilms} changePage={changePage} />
                ) : (
                    <NotFound>Not found films</NotFound>
                )
            ) : (
                <Loader />
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    currentFilms: state.currentFilms
});

export default connect(mapStateToProps)(FilmsPlaying);

