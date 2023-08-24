import { useEffect, useState } from "react";

function Hello(){
  // function effecFn(){
  //   // 2.
  //   console.log("created :)");
  //   return destoryedFn;
  // }
  // function destoryedFn(){
  //   // 2.
  //   console.log("destroyed :(");
  // }
  // // 1. useEffect(() => {
  // //   // console.log("created :)");
  // //   return () => console.log("destoryed :("); // Cleanup Function
  // // }, []);
  // // 2. 
  // useEffect(effecFn, []);
  // // 3. 나머지 1, 2 다 주석처리 하고
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("by :(");
  }, []);
  return <h1>Hello</h1>;
}




function Cleanup() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {/* 자바스크립트를 사용할때는 {} 로 묶어서 안에 작성해야한다. */}
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default Cleanup;
