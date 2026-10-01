import { createContext, useState ,useEffect} from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  const [allcoin, setAllcoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/v3/coins/markets?vs_currency=${currency.name}`,
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
      console.log(data);
      setAllcoin(data);
    } 
    catch (error) {
      console.log(error);
      setError(error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  const contextvalue = {
    allcoin,currency,setCurrency
  };
  return <CoinContext.Provider value={contextvalue}>{props.children}</CoinContext.Provider>;
};

export default CoinContextProvider;
