import React, { useState } from 'react'

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

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setValues((preValues) => ({
      ...preValues,
      [name]: sanitize(type, value),
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={values.title} name="title" onChange={handleChange} />
        <input
          value={values.calorie}
          name="calorie"
          type="number"
          onChange={handleChange}
        />
        <input value={values.content} name="content" onChange={handleChange} />
        <button type="submit">확인</button>
      </form>
    </div>
  )
}

export default FoodForm
