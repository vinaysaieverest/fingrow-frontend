import axios from 'axios';
import React, {  useContext, useState } from 'react';
import { dataContext } from '../context/GlobalContext';


export const Budget = () => {
    const{username}=useContext(dataContext)
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async() => {
    try {
        const response = axios.post(
          `http://localhost:5005/api/budget/${username}`,
          {
            category,
            amount,
            
          }
        );
        setCategory('');
        setAmount('')

        if((await response).status===404){
          alert("No budget found please create the budget")
        }
        if((await response).status===200){
            alert("Budget created succesfully")
          }
       
      } catch (e) {
        console.error("",e);
      }
   
  };

  return (
    <div className='mainContainer'>
        
        <div className='budgetForm'>
      <div className='Budgetform'>
        <h1 style={{color:"white"}}>
            Budget
        </h1>
        <input
          className='budgetImput'
          placeholder="Category"
          value={category}
          data-testid="titleInput"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <input
         className='budgetImput'
          placeholder="Amount"
          value={amount}
          data-testid="amountInput"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button className='budgetButton'
        data-testid="submitButton"
         onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>

  );
};

