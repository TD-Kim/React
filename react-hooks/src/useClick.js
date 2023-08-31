import "./styles.css";
import { useEffect, useRef } from "react";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    } // componentDidMount, componentDidUpdate 될 때 호출
    return () => {
      // componentWillUnMount 일때 return 된다.
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

export default function App() {
  // const potato = useRef(); // ref는 getElementById 를 하는것과 같음
  // setTimeout(() => potato.current.focus(), 3000);
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
      {/* <input ref={potato} placeholder="la" /> */}
    </div>
  );
}
