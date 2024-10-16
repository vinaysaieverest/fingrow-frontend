import axios from "axios";
import React, {  createContext, useEffect, useState } from "react";
export const dataContext = createContext<any>(null);
export default function GlobalContext(props: any) {
  const [isLogin,setIslogin] = useState(false)
  const [loginUsername, setLoginUsername] = useState('');
  const [transactionName, setTname] = useState("");
  const [username,setUsername]=useState('')
  const [Tdata,setTData]=useState([])
  const [Rdata,setRData]=useState([])
  useEffect(() => {
    const getTData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/recenttransactions/${username}`);
        setTData(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
  
    getTData(); 
  }, [username,transactionName,Tdata]);  
  useEffect(() => {
    const getRData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/report/${username}`);
        setRData(response.data);  
      } catch (e) {
        console.log(e);
      }
    };
  
    getRData(); 
    console.log(Rdata)
  }, [username,transactionName]);  
  
  const value = {
    isLogin,setIslogin,
    loginUsername, setLoginUsername,
    username,setUsername,
    Tdata,setTData,
    transactionName, setTname,
    Rdata,setRData
  };

  return (
    <dataContext.Provider value={value}>{props.children}</dataContext.Provider>
  );
}