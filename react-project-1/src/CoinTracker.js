import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // [] 를 쓰는 이유는 아래에서 map() 함수를 사용하기 위해.
  // map() 의 파라미터가 배열(과 인덱스인데 인덱스는 여기에서는 필요 없음)이기 때문.
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((Response) => Response.json()) // .json() 은 fetch 의 함수
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select>
        {coins.map((coin) => (
          <option key={coin.id}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CoinTracker;
