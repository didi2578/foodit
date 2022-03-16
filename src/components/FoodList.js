import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import FoodForm from './FoodForm'
import useTranslate from '../hooks/useTranslate'
import placeholderImg from '../assets/preview-placeholder.png'

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
      <img src={imgUrl || placeholderImg} alt={title} />
      <FoodListItemRows>
        <RowContainer>
          <h1>{title}</h1>
          <span>{calorie}kcal</span>
        </RowContainer>
        <p className="content">{content}</p>
        <ButtonContainer>
          <p>{formatDate(createdAt)}</p>
          <div>
            <Button onClick={handleEditClick} $edit>
              {t('edit button')}
            </Button>
            <Button onClick={handleDeleteClick} $delete>
              {t('delete button')}
            </Button>
          </div>
        </ButtonContainer>
      </FoodListItemRows>
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

  li {
    padding: 22px;
    border-radius: 15px;
    box-shadow: 0 0 9px 0 rgba(100, 126, 118, 0.09);
    background-color: #ffffff;
    :not(:last-child) {
      margin-bottom: 30px;
    }
  }
`

const FoodListItem = styled.div`
  display: flex;
  flex: none;
  margin-right: 15px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 11px;
    object-fit: cover;
    object-position: center;
    flex: none;
    margin-right: 15px;
  }
`

const FoodListItemRows = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;

  .content {
    flex: 1 1;
    margin: 0 0 18px;
    font-size: 16px;
    line-height: 1.63;
    color: #6d7372;
    display: -webkit-box;
    overflow: hidden;
    max-height: 52px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
const RowContainer = styled.div`
  flex: none;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  margin-right: 15px;
  h1 {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    flex-shrink: 1;
    margin-right: 15px;
  }
  span {
    flex: none;
    padding: 6px 8px 5px;
    border-radius: 6px;
    background-color: #eaf3ea;
    font-size: 15px;
    font-weight: bold;
    color: #4caf50;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.25px;
    color: #c6cdc1;
    flex: 1 1;
  }
`
const Button = styled.button`
  background-color: transparent;
  padding: 6px 12px 4px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
  ${(props) =>
    props.$edit &&
    css`
      margin-right: 8px;
      border: solid 1px #c8dad4;
      color: #7f8e89;
    `}

  ${(props) =>
    props.$delete &&
    css`
      border: solid 1px #e5cdcd;
      color: #b18181;
    `}
`
