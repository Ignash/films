import React, { useRef, useState } from "react";
import { IMAGE_SIZE } from "../const";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { actionDeleteFavorite, actionSetFavorites } from "../store/actions/actions";
import defaultImg from '../publish/defaultImg.png'


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
    transition: 0.3s;
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

function FilmItem(props) {
    const { filmItem, delFavorite, addFavorite, favoriteFilms } = props;
    let srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.small}${filmItem.poster_path}`;
    const user = useSelector((store)=> store.user)

    const [favorit, setFavorit] = useState(
        favoriteFilms?.includes(filmItem.id)
    );
    const refFavorit = useRef();

    const checkFavorit = () => {
        if (!refFavorit.current.classList.contains("favorit")) {
            setFavorit(true);
            addFavorite(filmItem.id);
        } else {
            setFavorit(false);
            delFavorite(filmItem.id);
        }
    };

    return (
        <ItemFilm>
            <Link to={`/film/${filmItem.id}`}>
                <img src={filmItem.poster_path ? srcImg : defaultImg} alt="poster" />
                <Desccriptions>
                    <h3>{filmItem?.title}</h3>
                    <p>{filmItem?.release_date}</p>
                    <p>{filmItem?.vote_average}</p>
                </Desccriptions>
            </Link>
            {user?.role && (
                <Favorit
                    className={favorit ? "favorit" : ""}
                    ref={refFavorit}
                    onClick={checkFavorit}
                >
                    &#9733;
                </Favorit>
            )}
        </ItemFilm>
    );
}

const mapDispatchToProps = (dispatch)=>({
        delFavorite: (id)=> dispatch(actionDeleteFavorite(id)),
        addFavorite: (id)=> dispatch(actionSetFavorites(id))
    });

const mapStateToProps = (state) => ({
        favoriteFilms: state.favoriteFilms,
        user: state.user
    })



export default connect(mapStateToProps, mapDispatchToProps)(FilmItem);
