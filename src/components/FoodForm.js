import useTranslate from 'hooks/useTranslate'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
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
    <Form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <FormRow>
        <FormLowContainer>
          <Input
            $title
            value={values.title}
            name="title"
            onChange={handleInputChange}
            placeholder="이름을 작성해 주세요."
          />
          <Input
            value={values.calorie}
            name="calorie"
            type="number"
            onChange={handleInputChange}
          />
          {onCancel && (
            <Button onClick={onCancel} $cancel>
              {t('cancel button')}
            </Button>
          )}
          <Button type="submit" $submit>
            {t('confirm button')}
          </Button>
        </FormLowContainer>
        <FormContent
          name="content"
          value={values.content}
          placeholder="내용을 작성해 주세요."
          onChange={handleInputChange}
        />
      </FormRow>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex: 1 1;
  margin: 60px 0 90px;
  padding: 22px;
  border-radius: 15px;
  box-shadow: 0 0 9px 0 rgba(100, 126, 118, 0.09);
  background-color: #ffffff;
`
const FormContent = styled.textarea`
  flex: 1 1;
`

const FormRow = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  margin-left: 20px;
`
const FormLowContainer = styled.div`
  flex: none;
  margin-bottom: 14px;
  display: flex;
`
const Input = styled.input`
  margin-right: 15px;
  flex: ${(props) => (props.$title ? `2 1` : `1 1`)};
`

const Button = styled.button`
  padding: 13px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;

  ${(props) =>
    props.$submit &&
    css`
      flex: none;
      color: #fff;
      background-color: #2c9631;
    `}

  ${(props) =>
    props.$cancel &&
    css`
      margin-right: 15px;
      color: #000;
      background-color: transparent;
    `}
`

export default FoodForm
