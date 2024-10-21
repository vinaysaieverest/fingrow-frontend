import axios from 'axios';
import React, {  useContext, useState } from 'react';
import { dataContext } from '../context/GlobalContext';
export const Saving = () => {
    const{username}=useContext(dataContext)
  const [goal, setSavingCategory] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = async() => {
    if (!goal || !target) {
      alert('Please fill in all fields');
      return; 
    }
    try {
        const response = axios.post(
          `http://localhost:5005/api/saving/${username}`,
          {
            goal,
            target,
            
          }
        );
        setSavingCategory('');
        setTarget('')
        console.log((await response))

        if((await response).status===404){
          alert("No saving found please create the budget")
        }
        if((await response).status===200){
            alert("Saving created succesfully")
            alert(response)
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
          required
          onChange={(e) => setSavingCategory(e.target.value)}
        />
      </div>
      <div>
        <input
         className='budgetImput'
          placeholder="Amount"
          value={target}
          data-testid="amountInput"
          required
          onChange={(e) => setTarget(e.target.value)}
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

