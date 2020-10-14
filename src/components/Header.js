import React from 'react';
import styled from "@emotion/styled";
import { NavLink } from 'react-router-dom';

const HeaderPage = styled.header`
  width: 100%;
  background: rgb(138 230 253);
  height: 45px
`;

const Navigation = styled.nav`
  height: 100%;
  ul{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li{
    padding: 0 10px;
    
  }
  a{
    color: #484848;
    &:hover{
      color: #000;
    }
    transition: 0.15s;
  }
  li:not(:last-child){
    border-right: 1px solid
  }
`;

export default function Header() {
    return (
      <HeaderPage>
        <Navigation>
            <ul>
              <li>
                <NavLink activeClassName='active' exact to='/'>Films now playing</NavLink>
              </li>
              <li>
                <NavLink activeClassName='active' to='/search'>Search</NavLink>
              </li>
            </ul>
        </Navigation>
      </HeaderPage>
    )
}
