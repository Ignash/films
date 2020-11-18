import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { API_KEY } from "../const";
import Loader from "./Loader";
import defaultVideo from '../publish/defaultVideo.png'


const Frame = styled.iframe`
    width: 100%;
    max-width: 640px;
    margin: 20px auto;
    display: block;
`;

export default function FilmVideo({ videoId }) {
    const [video, setVideo] = useState("loading");

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((filmVideo) => {
                let trailer = filmVideo?.results.filter(
                    (film) => film.type === "Trailer"
                );
                setVideo(trailer[0]?.key);
            });
    }, [videoId]);
    
    return video === "loading" ? (
        <Loader />
    ) : 
        <Frame
            width="640"
            height="370"
            src={video ? `https://www.youtube.com/embed/${video}` : defaultVideo}
            allowFullScreen
            frameBorder="0"
        ></Frame>
    ;
}
