import axios from "axios";
import React, {  createContext, useEffect, useState } from "react";
export const dataContext = createContext<any>(null);
export default function GlobalContext(props: any) {
  const [isLogin,setIslogin] = useState(false)
  const [loginUsername, setLoginUsername] = useState('');
  const [transactionName, setTname] = useState("");
  const [username,setUsername]=useState('')
  const [TransactionData,setTransactionData]=useState([])
  const [budgetReportData,setbudgetReportData]=useState([])
  const [savingReportData,setsavingReportData]=useState([])
  const [transactionReport,setTransactionReport]= useState([])
  const [selection, setSelection] = useState("Budget");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    const TransactionsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/recenttransactions/${username}`);
        setTransactionData(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
    TransactionsData(); 
  }, [username,transactionName,TransactionData]);  
  useEffect(() => {
    const getbudgetReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/budgetReport/${username}/${startDate}/${endDate}`);
        console.log(response)
        setbudgetReportData(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
    getbudgetReportData(); 
  }, [username,transactionName,budgetReportData,TransactionData]);  

  useEffect(() => {
    const getsavingReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/savingReport/${username}/${startDate}/${endDate}`);
        console.log(response)
        setsavingReportData(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
  
    getsavingReportData(); 
  }, [username,transactionName,savingReportData,TransactionData]); 
  useEffect(() => {
    const getsavingReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/transactionReport/${username}/${startDate}/${endDate}`);
        console.log(response)
        setTransactionReport(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
  
    getsavingReportData(); 
  }, [username,transactionName,transactionReport,TransactionData]); 
  
  const value = {
    isLogin,setIslogin,
    loginUsername, setLoginUsername,
    username,setUsername,
    TransactionData,setTransactionData,
    transactionName, setTname,
    budgetReportData,setbudgetReportData,
    savingReportData,setsavingReportData,
    selection, setSelection,
    startDate, setStartDate,endDate, setEndDate,
    transactionReport,setTransactionReport
  };

  return (
    <dataContext.Provider value={value}>{props.children}</dataContext.Provider>
  );
}