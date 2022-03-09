import useTranslate from 'hooks/useTranslate'
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

const INITIAL_VALUES = {
  title: '',
  calorie: 0,
  content: '',
}
const FoodForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) => {
  const t = useTranslate()
  const [values, setValues] = useState(initialValues)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('imgFile', values.imgFile)
    formData.append('title', values.title)
    formData.append('calorie', values.calorie)
    formData.append('content', values.content)
    const { food } = await onSubmit(formData)

    setValues(INITIAL_VALUES)
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
          initialPreview={initialPreview}
          onChange={handleChange}
        />
        <input value={values.title} name="title" onChange={handleInputChange} />
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
        <button type="submit">{t('confirm button')}</button>
        {onCancel && <button onClick={onCancel}>{t('cancel button')}</button>}
      </form>
    </div>
  )
}

export default FoodForm
