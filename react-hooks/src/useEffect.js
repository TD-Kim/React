import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  const sayHello = () => console.log("hello");
  useEffect(sayHello, [number]);
  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
}
