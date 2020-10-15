import React, { useState, useEffect } from "react";
import { API_KEY } from "../const";
import ReviewItem from "./ReviewItem";

export default function Reviews({ id }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
        )
            .then((response) => response.json())
            .then((reviewsData) => {
                console.log(reviewsData);
                setReviews(reviewsData.results);
            });
    }, [id]);

    return reviews.map((item) => <ReviewItem key={item.id} review={item} />);
}
