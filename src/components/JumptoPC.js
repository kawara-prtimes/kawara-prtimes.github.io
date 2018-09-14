import React from 'react'
import { ToolBar } from './ToolBar'
import styled from 'styled-components'

const StyledTextAlign = styled.a`
  text-align: center;
`

export const JumptoPC = () => {
  return (
    <ToolBar>
      <StyledTextAlign href="">PC版を見る</StyledTextAlign>
    </ToolBar>
  )
}
