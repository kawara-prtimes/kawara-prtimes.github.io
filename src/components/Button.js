import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 16px;
  text-align: center;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 0;
`
export const Button = (props) => {
  return (
    <StyledButton {...props} onClick={props.func}>
      {props.txt}
    </StyledButton>
  )
}
