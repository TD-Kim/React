import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Hello from "./routes/Hello";

// BrowserRouter 는 우리가 아는 URL 형태를 찾는 Router 이고
// HashRouter 는 URL에 '#' 이 붙는 형태의 URL 을 찾는 Router
// 대부분 BrowserRouter 를 사용함

// a 태그를 사용하여 페이지를 이동해도 되지만 그렇게하면 페이지 전체가 다시 로드된다.
// 이것을 피하기 위해 사용하는것이 Link 태그이다.

{
  /* Switch는 Route를 찾는 역할. Route는 URL을 의미.  */
}
function ReactRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/hello">
          <Hello />
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default ReactRouter;
