import styled from '@emotion/styled'


const Button = styled.button`
    
    align-content: center;
    border-radius: 3px;
    padding: 6px 20px;
    background-color: #49abdf;
    color #fff;
    
    &:hover{
        background-color: #3cd0f5;
    }
    &:disabled {
        background-color: rgb(138 230 253);
    }
`;

export default Button