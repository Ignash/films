import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const ButtonContainer = styled.button`
    padding: 5px;
    background-color: transparent;
    &:hover {
        transform: scale(1.1);
    }
    transition: 0.2s;
    font-size: 1.2rem;
`;
const ButtonsWrapper = styled.div`
    text-align: center;
    margin: 10px 0 20px;
`;
const SwitchButton = styled.button`
    padding: 0 5px;
    background-color: transparent;
    font-size: 1.5rem;
    color: #828282;
    &:hover {
        color: #000;
    }
    transition: 0.2s;
`;

export default function Pagination({ totalPages, currentPage, changePage }) {
    let leftLimit = 3;
    let rightLimit = 3;

    const [arrayButton, setArrayButton] = useState([]);

    const getCurrentArrayButton = ()=>{
        let pagesInPag = leftLimit + rightLimit + 1;
        let arrayButton = [];
        if (totalPages <= pagesInPag) {
            for (let i = 1; i <= totalPages; i++) {
                arrayButton.push(i);
            }
            return arrayButton;
        } 
        if (currentPage <= leftLimit) {
            for (let i = 1; i <= pagesInPag; i++) {
                arrayButton.push(i);
            }
            return arrayButton;
        } 
        if (totalPages - currentPage <= rightLimit) {
            for (
                let i = totalPages - pagesInPag + 1;
                i <= totalPages;
                i++
            ) {
                arrayButton.push(i);
            }
            return arrayButton;
        } 

        for ( let i = currentPage - leftLimit; i <= currentPage + rightLimit; i++ ) {
            arrayButton.push(i);
        };
        return arrayButton;
                
    }

    useEffect(() => {
        setArrayButton(getCurrentArrayButton());
    }, [currentPage, totalPages, leftLimit, rightLimit]);

    return (
        <>
            <ButtonsWrapper>
                {currentPage !== 1 && (
                    <SwitchButton onClick={() => changePage(currentPage - 1)}>
                        &laquo;
                    </SwitchButton>
                )}
                {arrayButton.map((item) => (
                    <ButtonContainer
                        className={item === currentPage ? "active" : ""}
                        key={item}
                        disabled={item === currentPage}
                        onClick={() => changePage(item)}
                    >
                        {item}
                    </ButtonContainer>
                ))}
                {totalPages !== currentPage && (
                    <SwitchButton onClick={() => changePage(currentPage + 1)}>
                        &raquo;
                    </SwitchButton>
                )}
                <span>from {totalPages}</span>
            </ButtonsWrapper>
        </>
    );
}
