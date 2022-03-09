import React, { useState } from 'react'
import styled from 'styled-components'
import FoodForm from './FoodForm'
import useTranslate from '../hooks/useTranslate'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}

const FoodItem = ({ item, onDelete, onEdit }) => {
  const t = useTranslate()
  const { imgUrl, title, calorie, content, createdAt } = item

  const handleDeleteClick = () => {
    onDelete(item.id)
  }

  const handleEditClick = () => {
    onEdit(item.id)
  }
  return (
    <FoodListItem>
      <img src={imgUrl} alt={title} width="640" height="426" />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>

      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>{t('edit button')}</button>
      <button onClick={handleDeleteClick}>{t('delete button')}</button>
    </FoodListItem>
  )
}

const FoodList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
  const [editingId, setEditingId] = useState(null)
  const handleCancel = () => setEditingId(null)

  return (
    <FoodListUl>
      {items.map((item) => {
        const { id, imgUrl, title, calorie, content } = item
        const initialValues = { title, calorie, content }

        const handleSubmit = (formData) => onUpdate(id, formData)

        const handleSubmitSuccess = (food) => {
          onUpdateSuccess(food)
          setEditingId(null)
        }

        if (item.id === editingId) {
          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          )
        }
        return (
          <li key={item.id}>
            <FoodItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        )
      })}
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
