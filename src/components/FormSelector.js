import React from 'react'
import styled from 'styled-components'

const StyledFormSelector = styled.div`
  box-sizing: border-box;
  margin: 5px 5px 0;
  select {
    display: block;
    width: 100%;
    line-height: 1.3;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 6px;
    vertical-align: middle;
    height: 40px;
    border: 1px solid #000;
    font-size: inherit;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
`
export const FormSelector = (props) => {
  return (
    <StyledFormSelector>
      <select>
        <option value="全てのフォーム">全てのフォーム</option>
        {props.forms.map((form, index) => {
          return (
            <option key={index} value={form.title}>{form.title}</option>
          )
        })}
      </select>
    </StyledFormSelector>
  )
}
