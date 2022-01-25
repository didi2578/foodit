import React from 'react'
import styled from 'styled-components'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}

const FoodItem = ({ item }) => {
  const { imgUrl, title, calorie, content, createdAt } = item

  return (
    <FoodListItem>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
    </FoodListItem>
  )
}

const FoodList = ({ items }) => {
  return (
    <FoodListUl>
      {items.map((item) => (
        <li>
          <FoodItem item={item} />
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
