import React from 'react'
import styled from 'styled-components'

const StyledToolBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  padding-top: 0;
  margin: 0;
  margin-top: ${props => props.margin ? '5px' : '0'};
  border-bottom: ${props => props.border ? '1px solid #000' : '0'};
  margin-bottom: ${props => props.border ? '5px' : '0'};
  * {
    width: 50%;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
    &:only-child {
      width: 100%;
    }
  }
`

export const ToolBar = (props) => {
  return (
    <StyledToolBar {...props}>
      {props.children}
    </StyledToolBar>
  )
}
