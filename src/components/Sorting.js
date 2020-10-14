import styled from "@emotion/styled";
import React, { useState } from "react";

const SortWrapper = styled.div`
    text-align: center;
    margin-top: 25px;
    select{
        padding: 3px 10px;
        margin-left: 10px;
        border: none;
        background: transparent;
        outline: none;
        border-bottom: 2px solid;
    }
`;
export default function Sorting({sortingList}) {

    const handleChange = (event) => {
        sortingList(event.target.value)
    };
    return (
        <SortWrapper>
            <span>Sorting by:</span>
            <select defaultValue=' ' onChange={handleChange}>
                <option disabled value=" ">
                    &nbsp;
                </option>
                <option value="descending">Date Descending</option>
                <option value="ascending">Date Ascending</option>
                <option value="AZ">Title(A-Z)</option>
                <option value="ZA">Title(Z-A)</option>
            </select>
        </SortWrapper>
    );
}
