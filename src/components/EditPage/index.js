import React from "react";
import WrapperSelect from "../../styled_component/WrapperSelect";
import { actionSetHeaderColor } from "../../store/actions/actions.js";
import { connect } from "react-redux";
import SelectColor from "./SelectColor";

function EditPage({ color, dispatch }) {
    return (
        <WrapperSelect>
            <span>Header color:</span>
            <SelectColor color={color}
                changeColor={(value) => {
                    dispatch(actionSetHeaderColor(value));
                }}
            />
                
        </WrapperSelect>
    );
}

const mapStateToProps = (state) => ({
    color: state.headerColor,
});
export default connect(mapStateToProps)(EditPage);
