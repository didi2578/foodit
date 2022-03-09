import React, { useEffect, useState } from 'react'
import FoodList from './FoodList'
import FoodForm from './FoodForm'
import LocaleSelect from './LocaleSelect'
import { getFoods, createFood, updateFood, deleteFood } from '../api'
import { LocaleProvider } from '../context/LocaleContext'

const App = () => {
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
    <LocaleProvider defaultValue="ko">
      <>
        <LocaleSelect />
        <div className="App">
          <button onClick={newestClick}>최신순</button>
          <button onClick={calorieClick}>칼로리</button>
          <FoodForm
            onSubmit={createFood}
            onSubmitSuccess={handleCreateSuccess}
          />
          <form onSubmit={handleSearchSubmit}>
            <input name="search" />
            <button type="submit">검색</button>
          </form>
        </div>
        <FoodList
          items={sortOrder}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더보기
          </button>
        )}
        {loadingError?.message && <p>{loadingError.message}</p>}
      </>
    </LocaleProvider>
  )
}

export default App
