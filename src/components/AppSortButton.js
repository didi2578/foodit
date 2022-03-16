import React from 'react'
import styled, { css } from 'styled-components'

const AppSortButton = ({ children, selected, onClick }) => {
  return (
    <Button select={selected} disabled={selected} onClick={onClick}>
      {children}
    </Button>
  )
}
const Button = styled.button`
  font-size: 16px;
  color: ${(props) => (props.select ? '#2c9631' : '#2b302f')};
  border: none;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
  :disabled {
    cursor: default;
  }
  ${(props) =>
    props.select &&
    css`
      position: ${(props) => props.select && 'relative'};
      font-weight: ${(props) => props.select && 'bold'};
      ::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: #2c9631;
        top: 16px;
        left: 0px;
        border-radius: 50%;
      }
    `}
`
export default AppSortButton
