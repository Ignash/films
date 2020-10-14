import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { API_KEY } from "../const";

const Frame = styled.iframe`
    width: 100%;
    max-width: 640px;
    margin: 20px auto;
    display: block;
`;

const NotFound = styled.p`
    text-align: center;
    font-size: 2rem;
    margin: 50px 0;
`;

export default function FilmVideo({ videoId }) {
    const [video, setVideo] = useState('');
   
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((filmVideo) => {
                let trailer = filmVideo.results.filter(film=> film.type === "Trailer")
                setVideo(trailer[0]?.key);
            });
    }, [videoId]);
    return (
        video ?
        <Frame
            width="640"
            height="370"
            src={`https://www.youtube.com/embed/${video}`}
            allowFullScreen
            frameBorder="0">
        </Frame> :
         <NotFound>video not found</NotFound>
    );
}
