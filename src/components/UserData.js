import styled from '@emotion/styled';
import React from 'react'

const WrapperUser = styled.div`
    position: absolute;
    background-color: #ccc;
    top: 45px;
    width: 160px;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
    // height: 0;
    transition: 0.5s;
    p{
        padding: 3px 10px;
    }
    &.show{
        height: auto;
    }
`;

export default  function UserData({user}) {
    return (
        <WrapperUser>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
        </WrapperUser>
    )
};
