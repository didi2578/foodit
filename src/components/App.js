import React, { useEffect, useState } from 'react'
import FoodList from './FoodList'
import { getFoods } from '../api'

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

  const handleDelete = (id) => {
    const nextItems = items.filter((items) => items.id !== id)

    setItems(nextItems)
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
  }

  useEffect(() => {
    handleLoad({ order, search })
  }, [order, search])
  return (
    <>
      <div className="App">
        <button onClick={newestClick}>최신순</button>
        <button onClick={calorieClick}>칼로리</button>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" />
          <button type="submit">검색</button>
        </form>
      </div>
      <FoodList items={sortOrder} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <p>{loadingError.message}</p>}
    </>
  )
}

export default App
