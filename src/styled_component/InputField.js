import styled from "@emotion/styled";

export const InputField = styled.input`
        width: 330px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        display: block;
        padding: 0 10px;
        z-index: 2;
        position: relative;
        background-color: transparent;
        &.notValid{
                border-color: red;
        }
        
`;
