import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import resetWhiteImg from '../assets/ic-reset-white.png'
import placeholderImg from '../assets/preview-placeholder.png'

const FileInput = ({ name, value, onChange, initialPreview }) => {
  const [preview, setPreview] = useState(initialPreview)
  const inputRef = useRef()

  const handleChange = (e) => {
    const nextValue = e.target.files[0]
    onChange(name, nextValue)
  }

  const handleClearClick = () => {
    const inputNode = inputRef.current

    if (!inputNode) return

    inputNode.value = ''
    onChange(name, null)
  }

  useEffect(() => {
    if (!value) return

    const nextPreview = URL.createObjectURL(value)
    setPreview(nextPreview)

    return () => {
      setPreview(initialPreview)
      URL.revokeObjectURL(nextPreview)
    }
  }, [value, initialPreview])

  return (
    <FileInputDiv>
      <img
        className={`FileInput-preview ${preview ? 'selected' : ''}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <InputHidden
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <ClearBtn onClick={handleClearClick}>
          <img src={resetWhiteImg} alt="지우기" />
        </ClearBtn>
      )}
    </FileInputDiv>
  )
}

const FileInputDiv = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 11px;
  overflow: hidden;
  background-color: #f6f6f6;
  border: 1px solid #dae7e3;
  flex: none;

  .FileInput-preview {
    display: block;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .FileInput-preview.selected {
    opacity: 0.48;
  }
`
const InputHidden = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const ClearBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 4px;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`
export default FileInput
