import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import WishlistPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import NotFound from "./pages/NotFoundPage";

function Main() {
  // Routes 를 렌더링 할 때는 안에있는 Route를 차례대로 검사하면서
  // 현재 경가 path 와일치하는지 하나씩 확인한다.

  return (
    <BrowserRouter>
      {/* <App> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            {/* <Route path="react-frontend-development" element={<CoursePage />} /> */}
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="questions">
            <Route index element={<QuestionListPage />} />
            <Route path=":questionId" element={<QuestionPage />} />
          </Route>
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
      {/* </App> */}
    </BrowserRouter>
  );
}

export default Main;
