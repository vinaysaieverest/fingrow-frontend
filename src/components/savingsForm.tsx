import axios from 'axios';
import React, {  useContext, useState } from 'react';
import { dataContext } from '../context/GlobalContext';


export const Saving = () => {
    const{username}=useContext(dataContext)
  const [goal, setSavingCategory] = useState('');
  const [totalSavings, setSavingAmount] = useState('');

  const handleSubmit = async() => {
    try {
        const response = axios.post(
          `http://localhost:5005/api/saving/${username}`,
          {
            goal,
            totalSavings,
            
          }
        );
        setSavingCategory('');
        setSavingAmount('')

        if((await response).status===404){
          alert("No saving found please create the budget")
        }
        if((await response).status===200){
            alert("Saving created succesfully")
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
            Saving
        </h1>
        <input
          className='budgetImput'
          placeholder="Category"
          value={goal}
          data-testid="titleInput"
          onChange={(e) => setSavingCategory(e.target.value)}
        />
      </div>
      <div>
        <input
         className='budgetImput'
          placeholder="Amount"
          value={totalSavings}
          data-testid="amountInput"
          onChange={(e) => setSavingAmount(e.target.value)}
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

