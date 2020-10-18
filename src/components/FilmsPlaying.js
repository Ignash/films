import React, { useState, useEffect, useRef} from "react";
import FilmList from "./FilmList";
import { API_KEY } from "../const";
import Loader from "./Loader";
import { InputField } from "../styled_component/InputField";
import actionGetCurrent from '../store/actions/actionGetCurrent';
import mapStateToProps from '../store/mapStateToProps';
import { connect, useDispatch, useSelector } from 'react-redux';

function FilmsPlaying({currentFilms}) {
    const defaultList = useSelector(store=>store.defaultListFilms)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const defaultListUrl = `https://api.themoviedb.org/3/movie/${defaultList}?api_key=${API_KEY}&language=en-US&page=${page}`;
    const [currentUrlFetch, setCurrentUrlFetch] = useState(defaultListUrl);
    const refInput = useRef("");

    let searchInAction = false;
    const delay = 1000;

    const changePage = (page) => {
        setPage(page);
    };

    const handlerSearch = () => {
        if (searchInAction) return;
        if (refInput.current.value.length > 0) {
            searchInAction = true;
            return setTimeout(() => {
                if (!refInput.current.value.length) {
                    setCurrentUrlFetch(defaultListUrl);
                    return;
                }
                setCurrentUrlFetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${refInput.current.value.replace(/\W/g,"%20")}&include_adult=false&page=1`);

                searchInAction = false;
            }, delay);
        }
    };
    useEffect(
        () => {
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
        dispatch(actionGetCurrent(currentUrlFetch));
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
            {currentFilms.results ? (
                <FilmList films={currentFilms} changePage={changePage} />
            ) : (
                <Loader />
            )}
        </>
    );
}

export default connect(mapStateToProps('FilmsPlaying'), null)(FilmsPlaying);
