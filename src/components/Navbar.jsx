import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import arrow_icon from "../assets/arrow_icon.png";
import { useState,useEffect } from "react";
import { CoinContext } from "../Api/Contextcoin";
import { Link } from "react-router-dom";


function Navbar() {
  const {setCurrency} = useContext(CoinContext)
  const CurrencyHandler = (e)=>{
     switch(e.target.value){
      case "usd": {
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      case "inr":{
        setCurrency({name:"inr",symbol:"₹"});
        break;
      }
      case "eur":{
        setCurrency({name:"eur",symbol:"€"});
        break;
      }

      default: {
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      
     }
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link to={`/`}><img src={logo} alt="image" /></Link>
      </div>
      <div className="centre-nav">
        <Link to={`/`}> <li>Home</li></Link>
      </div>
      <div className="right-nav">
        <select onChange={CurrencyHandler} className="opt">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </div>
  );
}

export default Navbar;
