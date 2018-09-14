import React from 'react'
import styled from 'styled-components'

const StyledSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding: 0;
  input {
    display: block;
    width: 100%;
    margin: 0 2px 0 0;
    padding: 0 4px;
    line-height: 1.3;
    appearance: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 6px;
    vertical-align: middle;
    height: 40px;
    border: 1px solid #000;
  }
  input[type=submit] {
    width: 66px;
    background-color: #000;
    color: #fff;
    border: 0;
    margin-right: 0;
  }
`
export const SearchBox = (props) => {
  return (
    <StyledSearchBox>
      <input type="text" placeholder='フォームを検索' />
      <input type="submit" value="検索" />
    </StyledSearchBox>
  )
}
