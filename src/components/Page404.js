import styled from '@emotion/styled'
import React from 'react'

export default function Page404() {
    const PageNotFound = styled.div`
        margin-top: 50px;
        text-align: center;
        font-weight: bold;
        font-size: 1.5rem;
        & p:first-of-type{
            font-size: 3rem;
        }
    `;
    return (
        <PageNotFound>
            <p>404</p>
            <p>
                Page not found
            </p>
        </PageNotFound>
    )
}
