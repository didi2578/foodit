import React, { useState } from 'react'
import FileInput from './FileInput'

const FoodForm = () => {
  const [values, setValues] = useState({
    title: '',
    calorie: 0,
    content: '',
  })

  const sanitize = (type, value) => {
    switch (type) {
      case 'number':
        return Number(value) || 0

      default:
        return value
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
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
