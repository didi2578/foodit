import React from 'react'
import styled from 'styled-components'

const AppSortButton = ({ children, selected, onClick }) => {
  return (
    <Button
      select={selected}
      disabled={selected}
      className={`${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
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
  position: ${(props) => (props.select ? 'relative' : '')};
  font-weight: ${(props) => (props.select ? 'bold' : '')};

  :not(:last-child) {
    margin-right: 20px;
  }

  :disabled {
    cursor: default;
  }

  .selected::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #2c9631;
    top: 16px;
    left: 0px;
  }
`
export default AppSortButton
