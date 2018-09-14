import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import { Avatar } from './Avatar'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 5px;

`

const StyledLogout = styled.div`
  display: flex;
  flex-direction: column;
  justiry-content: center;
  align-items: center;
  font-size: 10px;

`
const Logout = () => {
  return (
    <StyledLogout>
      <Avatar />
      <div>
        ログアウト
      </div>
    </StyledLogout>
  )
}

const StyledLogo = styled.div`
  img {
    width: 140px;
    height: auto;
  }
`
const Logo = () => (
  <StyledLogo>
    <img src={logo} alt='logo' />
  </StyledLogo>
)

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <Logout />
    </StyledHeader>
  )
}
