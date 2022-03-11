import React from 'react'
import styled from 'styled-components'
import { useLocale, useSetLocale } from '../context/LocaleContext'

const LocaleSelect = () => {
  const locale = useLocale()
  const setLocale = useSetLocale()

  const handleChange = (e) => setLocale(e.target.value)

  return (
    <Select value={locale} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </Select>
  )
}

export default LocaleSelect

const Select = styled.select`
  color: #eaf3ea;
  padding: 13px 8px;
  background-color: transparent;
  border: 1px solid #eaf3ea;
  border-radius: 5px;
  margin-left: 24px;
  outline: none;
`
