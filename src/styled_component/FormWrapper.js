import styled from '@emotion/styled'

const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    position: relative;
    form{
        margin-top: 30px;
    }
    & h3{
        font-size: 1.3rem;
        font-weight: 500;
        margin: 30px 0;
        text-align: left
    }
    & label{
        margin-top: 15px;
        margin-bottom: 3px;
    }
    & form{
        display: flex;
        flex-direction: column;
    }
    & button{
        align-self: flex-end;
        margin-top: 15px;
    }
    .error{
        color: red;
        font-size: 0.8rem;
    }
    .errorMessage{
        position: absolute;
        background-color: #e89650;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0;
        transition: 0.5s ease;
        overflow: hidden;
    }
    .showError{
        height: 35px
    }
 
`;
export default FormWrapper
