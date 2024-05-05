import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

const Currency=()=>{
  const [rates,setRates]=useState({});
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState('USD')
  const [toCurrency,setTOCurrency]=useState('INR')
  const [convert,setConvert]=useState(0)

  useEffect(()=>{
    const fetchDate=async()=>{
      try{
        const response=await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        setRates(response.data.rates)
      }catch(error){
        console.error('Error',error)
      }
    }
    fetchDate();
  },[fromCurrency])


  const handleAmount=(e)=>{
    setAmount(e.target.value)
  }
  const handlefrom=(e)=>{
    setFromCurrency(e.target.value)


  }
  const handleto=(e)=>{
  setTOCurrency(e.target.value)


  }
  const handleconvert=()=>{
    const result=(amount*rates[toCurrency]).toFixed(2);
    setConvert(result)


  }
  return (
    <><div className="Currency-converter">
      <h2>Currency Converter</h2>
      <div className="Amount">
        <label >Amount</label>
        <input type="number"  value={amount} onChange={handleAmount} />

      </div>
      <div className="FromCurrency">
        <label >FromCurrency
        <select onChange={handlefrom} value={fromCurrency}>
          {Object.keys(rates).map(currency=>(
          <option key={currency} value={currency}>{currency}</option>
        ))}
        </select>
     
        </label>
        
        
      </div>
      <div className="tocurrency">
        <label >
          ToCurrency:
          <select onChange={handleto} value={toCurrency} >
          {Object.keys(rates).map(currency=>(
          <option key={currency} value={currency}>{currency}</option>
        ))}
          </select>
        </label>
      </div>
      <button onClick={handleconvert}> Convert</button>
      <div>
        {convert!==0 &&(
        <p>{amount}{fromCurrency} equal {convert}</p>
      )}
      </div>
      </div>
      
    </>
  )



}
export default Currency;