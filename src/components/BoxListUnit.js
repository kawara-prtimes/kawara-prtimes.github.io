import React from 'react'
import styled from 'styled-components'

import { Button } from './Button'

const StyledBoxListUnit = styled.li`
  display: ${props => props.display}
  padding: 5px;
  border-bottom: 1px dashed #000;
  &:last-child {
    border-bottom: 1px solid #000;
  }
`

const StyledDetailItems = styled.ul`
  display: flex;
  li {
    margin-right: 5px;
  }
`
const StyledContents = styled.li`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledEmail = styled.li`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
`
const StyledStatus = styled.li`
  background-color: #aaa;
  color: #fff;
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 12px;
`
const StyledPriority = styled.li`
  background-color: #ccc;
  color: #fff;
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 12px;
`
const StyledDetailBtn = styled.div`
  text-align: right;
`

export const BoxListUnit = (props) => {
  return (
    <StyledBoxListUnit {...props}>
      <ul>
        <li>{props.title}</li>
        <StyledContents>{props.contents}</StyledContents>
        <StyledEmail>{props.email}</StyledEmail>
        <li>{props.date}</li>
        <li>
          <StyledDetailItems>
            <li>{props.res}/{props.comments}</li>
            <StyledStatus>{props.status}</StyledStatus>
            <StyledPriority>{props.priority}</StyledPriority>
          </StyledDetailItems>
        </li>
        <li>担当: {props.staff ? props.staff : 'なし'}</li>
      </ul>
      <StyledDetailBtn>
        <a href={/task/ + props.id}>
          <Button txt='詳細を見る' />
        </a>
      </StyledDetailBtn>
    </StyledBoxListUnit>
  )
}
