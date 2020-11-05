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
                <option disabled value=" ">
                    &nbsp;
                </option>
                <option value="primary_release_date.desc">Date Descending</option>{/*sort_by: primary_release_date.desc */}
                <option value="primary_release_date.asc">Date Ascending</option>{/* primary_release_date.asc */}
                <option value="title.asc">Title(A-Z)</option>{/* title.desc */}
                <option value="title.desc">Title(Z-A)</option>{/* title.asc */}
                {/* <option value="descending">Date Descending</option>
                <option value="ascending">Date Ascending</option>
                <option value="AZ">Title(A-Z)</option>
                <option value="ZA">Title(Z-A)</option> */}
            </select>
        </WrapperSelect>
    );
}
