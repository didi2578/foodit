import React, { useState } from 'react'
import FoodList from './FoodList'
import items from '../mock.json'

const App = () => {
  const [order, setOrder] = useState('createdAt')

  const sortOrder = items.sort((a, b) => b[order] - a[order])

  const newestClick = () => setOrder('createdAt')
  const calorieClick = () => setOrder('calorie')

  return (
    <div className="App">
      <button onClick={newestClick}>최신순</button>
      <button onClick={calorieClick}>칼로리</button>
      <FoodList items={sortOrder} />
    </div>
  )
}

export default App
