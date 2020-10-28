import React from "react";
import WrapperSelect from "../styled_component/WrapperSelect";
import {actionSetHeaderColor} from "../store/actions/actions.js";
import { useDispatch} from "react-redux";
import styled from "@emotion/styled";
import { connect } from 'react-redux';


const Select = styled.select`
    width: 150px;
    
`;

function EditPage({color}) {
    const dispatch = useDispatch();
    return (
        <WrapperSelect>
            <span>Header color:</span>
            <Select
                style={{backgroundColor: color}}
                defaultValue={color}
                onChange={(event) => {
                    dispatch(actionSetHeaderColor(event.target.value));
                }}>
                <option value="#fff" style={{backgroundColor: "#fff", padding: "3px 0"}}>color</option>
                <option value="#f3ae56" style={{backgroundColor: "#f3ae56"}}></option>
                <option value="#8ae6fd" style={{backgroundColor: "#8ae6fd"}}></option>
                <option value="#45d071" style={{backgroundColor: "#45d071"}}></option>
                <option value="#eae426" style={{backgroundColor: "#eae426"}}></option>
            </Select>
        </WrapperSelect>
    );
}


const mapStateToProps = (state) => ({
    color: state.headerColor
})
export default connect(mapStateToProps)(EditPage);
