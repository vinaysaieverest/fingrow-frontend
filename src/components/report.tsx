import { useContext } from 'react'
import { Rcard } from '../types'
import { dataContext } from '../context/GlobalContext'

export function Report({category,allocatedAmount,spentAmount}:Rcard) {
  return (
    <div className="transaction-card">
      <div className="transaction-details">
        <p className="transaction-item" data-testid="categoryName"><span>Category:</span> {category}</p>
        <p className="transaction-item"  data-testid="currentAmount"><span>Current Amount:</span> {allocatedAmount}</p>
        <p className="transaction-item"  data-testid="spendAmount"><span>Spent Amount:</span> {spentAmount}</p>
      </div>
    </div>
  )
}


