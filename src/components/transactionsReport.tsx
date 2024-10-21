import { Tcard } from '../types'

export function RecentTransaction({ transactionName, amount, type, category, createdAt }: Tcard) {
    const dateObj = new Date(createdAt);
    const normalDate = dateObj.toLocaleString();
  return (
    <div className="transaction-card">
      
      <div className="transaction-details">
       
        <p className="transaction-item" data-testid="transactionName"><span></span> {transactionName}</p>
        <p className="transaction-item" data-testid="amount"><span></span> {amount} Rupees</p>
        <p className="transaction-item" data-testid="type"><span></span> {type}</p>
        <p className="transaction-item" data-testid="category"><span></span> {category}</p>
        <p className="transaction-item" data-testid="date"><span></span> {normalDate}</p>
      </div>
    </div>
  )
}
