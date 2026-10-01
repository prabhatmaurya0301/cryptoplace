import React, { useContext, useState, useEffect } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../Api/Contextcoin";
import LineChart from "../components/LInechart";

function Coin() {
  const { coinID } = useParams("");
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/v3/coins/${coinID}`, {
        headers: {
          "x-cg-demo-api-key": "CG-RfLpFbLfYn1YaiVoUiyiym1g",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        {
          headers: {
            "x-cg-demo-api-key": "CG-RfLpFbLfYn1YaiVoUiyiym1g",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="line-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinnar">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin;
