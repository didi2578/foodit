import React from 'react'
import styled from 'styled-components'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}

const FoodItem = ({ item, onDelete }) => {
  const { imgUrl, title, calorie, content, createdAt } = item

  const handleDeleteClick = () => {
    onDelete(item.id)
  }

  return (
    <FoodListItem>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleDeleteClick}>삭제</button>
    </FoodListItem>
  )
}

const FoodList = ({ items, onDelete }) => {
  return (
    <FoodListUl>
      {items.map((item) => (
        <li>
          <FoodItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </FoodListUl>
  )
}

export default FoodList

const FoodListUl = styled.ul`
  list-style: none;
  padding: 0;
`

const FoodListItem = styled.div`
  margin: 10px;
`
