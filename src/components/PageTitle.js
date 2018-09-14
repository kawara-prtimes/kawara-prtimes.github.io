import React from 'react'
import styled from 'styled-components'

const StyledPageTitle = styled.h2`
  font-weight: bold;
  text-align: center;
  background-color: #fff;
  color: #000;
  margin: 0;
  position: relative;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`
const StyledBackArrow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  a {
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
  }
`
const StyledPageTitleTxt = styled.div`
  width: 100%;
  margin: 0 40px;
`
export const PageTitle = (props) => {
  return (
    <StyledPageTitle>
      <StyledBackArrow>
        <a href={props.link}>◀︎</a>
      </StyledBackArrow>
      <StyledPageTitleTxt>
        {props.txt}
      </StyledPageTitleTxt>
    </StyledPageTitle>
  )
}
