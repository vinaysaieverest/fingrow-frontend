import { useContext } from 'react'
import { savingsTypes } from '../types'
import { dataContext } from '../context/GlobalContext'

export function SavingReport({Saving,Target,Current}:savingsTypes) {
  return (
    <div className="transaction-card">
      <div className="transaction-details">
        <p className="transaction-item" data-testid="categoryName"><span>Goal:</span> {Saving}</p>
        <p className="transaction-item"  data-testid="currentAmount"><span>Target Amount:</span> {Target}</p>
        <p className="transaction-item"  data-testid="spendAmount"><span>Current Amount:</span> {Current}</p>
      </div>
    </div>
  )
}


