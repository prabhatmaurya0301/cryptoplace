import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../Api/Contextcoin";

import { Link } from "react-router-dom";
function Home() {
  const {allcoin, currency, loading, error } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const[input,setInput] = useState('');

  useEffect(() => {
    setDisplayCoin(allcoin);
  }, [allcoin]);

  if (loading) {
    return <h1>Loading the data...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

   const inputHandler=(e)=>{
    setInput(e.target.value);
    if(e.target.value===""){
        setDisplayCoin(allcoin);
    }
  }

  const searchHandler = async (e)=>{
        e.preventDefault();
        const coins = await allcoin.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest
          <br />
          Crypto Market Place
        </h1>
        <p>
          welcome to the world's largest cryptocurrency market place.
          <br />
          sign up to explore more about Cryptos
        </p>
        <form onSubmit = {searchHandler} action="">
          <input onChange={inputHandler} list= "coinlist" value ={input} type="text" placeholder="Search Crypto.." required/>

          <datalist id="coinlist">
            {allcoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>


          <button type="submit">search</button>
        </form>
      </div>

      <div className="cryptotable">
        <div className="table-layout">
          <p>Rank</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H-change</p>
          <p className="marketcap">Market-Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol} </p>
            </div>
            <p className="price">
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p 
            style={{ textAlign: "center" }} 
            className= {item.price_change_percentage_24h>0?"green":"red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="marketcap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
