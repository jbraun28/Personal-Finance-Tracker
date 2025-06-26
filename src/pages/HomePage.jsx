import React, { useEffect, useState, useRef, useContext } from 'react';

function HomePage() {
  const items = ["Expense Tracker", "Budget Tracker", "Bill Tracker", "Goal Tracker", "Learning"]
  const listItems = items.map(item => (
    <li key={item}> 
    <button onClick = {() => alert(`You selected ${item}`)}> 
      {item}
    </button>
    </li>
  ))

  return (
    <div>
      <h1>Welcome to PFT! 🎉💸</h1>
      <p>All things personal finance - to help you better manage your money 🙌</p>

      <h3>Available Functions</h3>
      <ul class="ul">{listItems}</ul>
      
    </div>
  )
}

export default HomePage;
