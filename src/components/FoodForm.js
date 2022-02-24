import { createFood } from 'api'
import React, { useState } from 'react'
import FileInput from './FileInput'

const sanitize = (type, value) => {
  switch (type) {
    case 'number':
      return Number(value) || 0

    default:
      return value
  }
}

const INITIAL_VALUE = {
  title: '',
  calorie: 0,
  content: '',
}
const FoodForm = ({ onSubmitSuccess }) => {
  const [values, setValues] = useState(INITIAL_VALUE)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('imgFile', values.imgFile)
    formData.append('title', values.title)
    formData.append('calorie', values.calorie)
    formData.append('content', values.content)
    const { food } = await createFood(formData)

    setValues(INITIAL_VALUE)
    onSubmitSuccess(food)
  }

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    handleChange(name, sanitize(type, value))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        />
        <input value={values.title} name="title" onChange={handleChange} />
        <input
          value={values.calorie}
          name="calorie"
          type="number"
          onChange={handleInputChange}
        />
        <input
          value={values.content}
          name="content"
          onChange={handleInputChange}
        />
        <button type="submit">확인</button>
      </form>
    </div>
  )
}

export default FoodForm
