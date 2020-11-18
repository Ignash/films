import React from "react";
import WrapperSelect from "../styled_component/WrapperSelect";

export default function Sorting({ changeSorting }) {
    const handleChange = (event) => {
        changeSorting(event.target.value);
    };
    return (
        <WrapperSelect>
            <span>Sorting by:</span>
            <select defaultValue=" " onChange={handleChange}>
                <option disabled value=" ">&nbsp;</option>
                <option value="primary_release_date.desc">Date Descending</option>
                <option value="primary_release_date.asc">Date Ascending</option>
                <option value="title.asc">Title(A-Z)</option>
                <option value="title.desc">Title(Z-A)</option>
            </select>
        </WrapperSelect>
    );
}
