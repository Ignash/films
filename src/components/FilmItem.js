import React, { useState, useEffect } from "react";
import { IMAGE_SIZE } from "../const";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { actionAddFavorites } from "../store/actions/actions";
import defaultImg from "../publish/defaultImg.png";
import FilmTabPortal from "./FilmTabPortal";
import FilmById from "./FilmById";

const ItemFilm = styled.section`
    width: 220px;
    margin: 20px 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
    &:hover {
        transform: translateY(-10px);
    }
    transition: 0.3s ease;
    position: relative;
`;

const Desccriptions = styled.div`
    padding: 10px;
    position: relative;
    p {
        color: rgba(0, 0, 0, 0.6);
    }
    h3 {
        margin: 0 0 10px 0;
        cursor: pointer;
    }
    p: last-child {
        position: absolute;
        top: -40px;
        right: 10px;
        color: white;
        height: 30px;
        width: 30px;
        background: #5caabd;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        border: 2px solid #1b3e27;
    }
`;

const Favorit = styled.button`
    font-size: 2rem;
    position: absolute;
    top: 290px;
    left: 5px;
    color: #ccccccd9;
    transition: 0.3s;
    &:hover {
        color: #ccc;
    }
    &.favorit {
        color: #ecc325f2;
    }
`;

const ButtonBlock = styled.div`
    font-size: 3rem;
    // position: absolute;
    left: 40px;
    button {
        color: #6f6f6f;
        display: block;
    }
`;

function FilmItem(props) {
    const { filmItem, addFavorite, favoriteFilms } = props;
    const srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.small}${filmItem.poster_path}`;
    const user = useSelector((store) => store.user);

    const [showNewWindow, setShowNewWindow] = useState(false);
    const [showItem, setShowItem] = useState(true)

    const checkFavorit = () => {
        addFavorite(filmItem.id);
    };

    const closePortal = () => {
        setShowNewWindow(false);
    };

    useEffect(()=>{
        window.addEventListener("beforeunload", closePortal);
        return ()=>{
            window.removeEventListener("beforeunload", closePortal);
        }
    }, [])

    window.addEventListener("beforeunload", () => {
        closePortal();
    });

    return (
        <>
            {showItem && (<ItemFilm>
                <div>
                    <Link to={`/film/${filmItem.id}`}>
                        <img
                            src={filmItem.poster_path ? srcImg : defaultImg}
                            alt="poster"
                        />
                    </Link>
                    <Desccriptions>
                        <h3
                            title="show in new window"
                            onClick={() => {
                                setShowNewWindow(true);
                                setShowItem(false)
                            }}
                        >
                            {filmItem?.title}
                        </h3>
                        <p>{filmItem?.release_date}</p>
                        <p>{filmItem?.vote_average}</p>
                    </Desccriptions>
                </div>
                {user?.role && (
                    <Favorit
                        className={
                            favoriteFilms?.includes(filmItem.id)
                                ? "favorit"
                                : ""
                        }
                        onClick={checkFavorit}
                    >
                        &#9733;
                    </Favorit>
                )}
            </ItemFilm>)}
            {showNewWindow && (
                <FilmTabPortal closePortal={closePortal} >
                    <ButtonBlock>
                        <button
                            title="close"
                            onClick={() => {
                                closePortal();
                            }}
                        >
                            &#10005;
                        </button>
                        <button
                            title="return to tab"
                            onClick={(event) => {
                                console.dir(event.target)
                                closePortal();
                                setShowItem(true)
                            }}
                        >
                            &#8672;
                        </button>
                    </ButtonBlock>
                    <FilmById filmId={filmItem.id} />
                       
                </FilmTabPortal>
            )}
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addFavorite: (id) => dispatch(actionAddFavorites(id)),
});

const mapStateToProps = (state) => ({
    favoriteFilms: state.favoriteFilms,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmItem);
