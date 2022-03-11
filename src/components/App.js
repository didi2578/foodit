import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFoods, createFood, updateFood, deleteFood } from '../api'
import FoodList from './FoodList'
import FoodForm from './FoodForm'
import LocaleSelect from './LocaleSelect'
import useTranslate from 'hooks/useTranslate'
import AppSortButton from './AppSortButton'

import logoImg from '../assets/logo.png'
import searchImg from '../assets/ic-search.png'
import logoTextImg from '../assets/logo-text.png'
import backgroundImg from '../assets/background.png'

const App = () => {
  const t = useTranslate()
  const [order, setOrder] = useState('createdAt')
  const [items, setItems] = useState([])
  const [cursor, setCursor] = useState()
  const sortOrder = items.sort((a, b) => b[order] - a[order])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingError, setLoadingError] = useState(null)
  const [search, setSearch] = useState('')

  const newestClick = () => setOrder('createdAt')
  const calorieClick = () => setOrder('calorie')

  const handleDelete = async (id) => {
    const result = await deleteFood(id)
    alert('삭제하시겠습니까?')
    if (!result) return
    setItems((prevItems) => prevItems.filter((items) => items.id !== id))
  }
  const handleLoad = async (options) => {
    let result
    try {
      setLoadingError(null)
      setIsLoading(true)
      result = await getFoods(options)
    } catch (error) {
      setLoadingError(error)
      return
    } finally {
      setIsLoading(false)
    }
    const {
      foods,
      paging: { nextCursor },
    } = result
    if (!options.cursor) {
      setItems(foods)
    } else {
      setItems((prevItems) => [...prevItems, ...foods])
    }
    setCursor(nextCursor)
  }

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearch(e.target['search'].value)
    console.log(e.target['search'].value)
  }

  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems])
  }

  useEffect(() => {
    handleLoad({ order, search })
  }, [order, search])

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id)
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ]
    })
  }

  return (
    <AppDiv style={{ backgroundImage: `url("${backgroundImg}")` }}>
      <div className="App-nav">
        <img src={logoImg} alt="Foodit" />
      </div>
      <div className="App-container">
        <FoodForm
          onSubmit={createFood}
          onSubmitSuccess={handleCreateSuccess}
          className="FoodForm"
        />
        <div className="App-filter">
          <form onSubmit={handleSearchSubmit}>
            <input name="search" />
            <button type="submit">
              <img src={searchImg} alt="검색" />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === 'createdAt'}
              onClick={newestClick}
            >
              {t('newest')}
            </AppSortButton>
            <AppSortButton
              selected={order === 'calorie'}
              onClick={calorieClick}
            >
              {t('sort by calorie')}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={sortOrder}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <LoadMoreBtn disabled={isLoading} onClick={handleLoadMore}>
            {t('load more')}
          </LoadMoreBtn>
        )}
        {loadingError?.message && <p>{loadingError.message}</p>}
      </div>
      <Footer>
        <div className="App-footer-container">
          <img src={logoTextImg} alt="Foodit" />
          <LocaleSelect />
          <div className="App-footer-menu">
            {t('terms of service')} | {t('privacy policy')}
          </div>
        </div>
      </Footer>
    </AppDiv>
  )
}

const AppDiv = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-position: top 75px, left center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 60px 0 90px;

  input,
  textarea {
    padding: 13px 20px;
    border: 1px solid #dae7e3;
    border-radius: 6px;
    outline: none;
    font-size: 16px;
  }

  textarea {
    resize: none;
  }

  input:focus,
  textarea:focus {
    border: 1px solid #56ca5a;
  }

  input::placeholder,
  textarea::placeholder {
    color: #b6bab2;
  }
  .App-container {
    flex: 1 1;
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
  .App-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    border-bottom: 1px solid #dae7e3;
    background-color: #fff;
    flex: none;
  }
  .App-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    align-items: center;
    form {
      position: relative;
      button {
        position: absolute;
        top: 10px;
        right: 13px;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
  .FoodForm {
    margin: 60px 0 90px;
    padding: 22px;
    border-radius: 15px;
    box-shadow: 0 0 9px 0 rgba(100, 126, 118, 0.09);
    background-color: #ffffff;
  }
`

const LoadMoreBtn = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: #f2f6f2;
  font-size: 18px;
  letter-spacing: -0.32px;
  color: #4caf50;
  border: none;
  cursor: pointer;
`

const Footer = styled.div`
  margin-top: 250px;
  flex: none;
  background-color: #4caf50;

  .App-footer-container {
    display: flex;
    align-items: center;
    padding: 30px;
  }

  .App-footer-menu {
    margin-left: auto;
    font-size: 14px;
    letter-spacing: -0.25px;
    color: #d4fdd6;
  }
`

export default App
