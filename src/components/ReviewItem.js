import styled from '@emotion/styled'
import React from 'react'

export default function ReviewItem({review}) {
    const ReviewWrapper = styled.div`
        width: 80%;
        min-height: 130px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        background-color: #fff;
        margin:  10px auto;
        padding: 20px 30px;
        h3{
            margin-bottom: 20px
        }
        a{
            text-decoration: underline;
        }
    `;
    return (
        <ReviewWrapper>
            <h3>A review by {review.author}</h3>
            <p>{review.content.slice(0, 600)} . . . <a href={review.url} target="_blank" rel="noopener noreferrer">read the rest.</a></p>
        </ReviewWrapper>
    )
}
