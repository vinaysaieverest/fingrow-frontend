import axios from "axios";
import React, {  useContext, useState } from "react";
import { dataContext } from "../context/GlobalContext";

export function Transaction() {
  const { username } = useContext(dataContext);
  const {transactionName, setTname}= useContext(dataContext);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async () => {
    if(!transactionName||!amount||!type||!category){
      alert("Please fill all the fields")
      return
    }
    try {
      const response = axios.post(
        `http://localhost:5005/api/transaction/${username}`,
        {
          transactionName,
          amount,
          type,
          category,
        }
      );
      setAmount('');
      setCategory('');
      setTname('');
      setType('')
      if ((await response).status === 200) {
        const result = (await response).data.result;
        if (result && result.success) {
          alert(result.message);
        } else {
          alert("Transaction completed");
        }
      } else if ((await response).status === 404) {
        alert("No budget found please create the budget");
      }
    }
   catch (e) {
    console.error("",e);
  } 
  };
     
    
  
  return (
    <div className="TransactionmainContainer">
      <div className="Budgetform">
        <h1
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          data-testid="heading"
        >
          Make a transaction
        </h1>
        <input
          type="text"
          placeholder="Transaction name"
          className="transactionInput"
          value={transactionName}
          onChange={(e) => setTname(e.target.value)}
          data-testid="nameInput"
        />
        <input
          type="text"
          placeholder="Amount"
          className="transactionInput"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          data-testid="amountInput"
        />
        <input
          type="text"
          placeholder="Type"
          className="transactionInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
          data-testid="typeInput"
        />
        <input
          type="text"
          placeholder="Category"
          className="transactionInput"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="categoryInput"
        />
        <button className="transactionButton" onClick={handleSubmit} data-testid="submitButton">
          Submit
        </button>
      </div>
    </div>
  );
}
