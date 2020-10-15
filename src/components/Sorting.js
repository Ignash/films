import React from "react";
import WrapperSelect from "../styled_component/WrapperSelect";

export default function Sorting({ sortingList }) {
    const handleChange = (event) => {
        sortingList(event.target.value);
    };
    return (
        <WrapperSelect>
            <span>Sorting by:</span>
            <select defaultValue=" " onChange={handleChange}>
                <option disabled value=" ">
                    &nbsp;
                </option>
                <option value="descending">Date Descending</option>
                <option value="ascending">Date Ascending</option>
                <option value="AZ">Title(A-Z)</option>
                <option value="ZA">Title(Z-A)</option>
            </select>
        </WrapperSelect>
    );
}
