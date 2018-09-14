import React from 'react'
import styled from 'styled-components'
import avatarimg from '../img/avatar.png'

const StyledAvatar = styled.div`
  width: ${props => props.size ? props.size : '45px' };
  height: ${props => props.size ? props.size : '45px' };
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
`
export const Avatar = (props) => (
  <StyledAvatar size={props.size}>
    <img src={avatarimg} alt='avatar' />
  </StyledAvatar>
)
