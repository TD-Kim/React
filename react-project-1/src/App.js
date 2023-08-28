import { useEffect, useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  // 1. console.log('I run all the time');  {/* component가 render 될 때 */}
  useEffect(() => {
    // 1. console.log("CALL THE API....");
    // 2.
    console.log("I run only once.");
  }, []); {/* [] 안에는 react.js 가 무엇을 지켜볼지 작성해준다. */}
  useEffect(() => {
    // 1. console.log("SEARCH FOR", keyword);
    // 2. if(keyword !== "" && keyword.length > 5){
    //   console.log("SEARCH FOR", keyword);
    // };
    // 3.
    console.log("I run when 'keyword' changes.");
  }, [keyword]);  {/* keyword 가 변화할 때만 코드를 실행할 거라고 react.js 에게 알려주는 것 */}
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword & counter' changes.");
  }, [keyword, counter]); {/* OR 의 개념으로 keyword 혹은 counter 가 변경될 때 실행 */}
  useEffect(function(){
    console.log('test');
  }, [keyword]);
  return (
    <div>
      <input 
        value={keyword} 
        onChange={onChange} 
        type="text" 
        placeholder="Search here...."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
