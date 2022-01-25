import React, { useState } from 'react'
import FoodList from './FoodList'
import mockItems from '../mock.json'

const App = () => {
  const [order, setOrder] = useState('createdAt')
  const [items, setItems] = useState(mockItems)
  const sortOrder = items.sort((a, b) => b[order] - a[order])

  const newestClick = () => setOrder('createdAt')
  const calorieClick = () => setOrder('calorie')

  const handleDelete = (id) => {
    console.log('app', id)
    const nextItems = items.filter((items) => items.id !== id)
    console.log('next', nextItems)
    setItems(nextItems)
  }

  return (
    <div className="App">
      <button onClick={newestClick}>최신순</button>
      <button onClick={calorieClick}>칼로리</button>
      <FoodList items={sortOrder} onDelete={handleDelete} />
    </div>
  )
}

export default App
