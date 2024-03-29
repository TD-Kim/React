import { getReviews } from "../api";
import ReviewList from "./ReviewList";
// import items from "../mock.json";
// import mockItems from "../mock.json";
import { useEffect, useState } from "react";
import { addDatas, getDatas, deleteDatas } from "../firebase.js";
import ReviewForm from "./ReviewForm.js";

const LIMIT = 25;

function App() {
  // const [items, setItems] = useState(mockItems);
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState({});
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  // sort 메소드에 아무런 아규먼트도 전달하지 않을 때는 기본적으로 유니코드에 정의된 문자열 순서에 따라 정렬된다.
  // ==> compareFunction이 생략될 경우 , 배열의 요소들은 모두 문자열 취급되며, 유니코드 값 서대로 정렬된다.
  // 그렇기 때문에 numbers에 sort 메소드를 사용한 것 처럼, 숫자를 정렬할 때는 우리가 상식적으로 이해하는 오름차순이나 내림차순 정렬이 되지 않는다.
  // 그럴 땐 sort 메소드에 다음과 같은 콜백함수를 아규먼트로 작성해주면 된다.
  // 반환 값 < 0 : a가 b보다 앞에 있어야 한다.
  // 반환 값 = 0 : a와 b의 순서를 바꾸지 않는다.
  // 반환 값 > 0 : b가 a보다 앞에 있어야 한다.
  // a-b : 오름차순, b-a : 내림차순
  // const sortedItems = items.sort((a, b) => b.rating - a.rating);
  // const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const sortedItems = items;
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = async (docId) => {
    // 1. 화면에서만 삭제
    // const nextItems = items.filter((item) => item.id !== id);
    // setItems(nextItems);

    // 2. db에서 삭제(삭제가 성공했을 때만 그 결과를 반영한다.)
    const result = await deleteDatas("movie", docId);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  // const handleLoadClick = async () => {
  //   const { reviews } = await getReviews();
  //   setItems(reviews);
  // };
  // const handleLoad = async (orderQuery) => {
  //   const { reviews } = await getReviews(orderQuery);
  //   setItems(reviews);
  // };
  // const handleLoad = async (options) => {
  //   const { reviews } = await getReviews(options);
  //   setItems(reviews);
  // };
  // const handleLoad = async (options) => {
  //   const { reviews, paging } = await getReviews(options);
  //   if (options.offset === 0) {
  //     setItems(reviews);
  //   } else {
  //     setItems([...items, ...reviews]);
  //   }
  //   setOffset(options.offset + reviews.length);
  //   setHasNext(paging.hasNext);
  // };
  // const handleLoad = async (options) => {
  //   const { reviews, paging } = await getReviews(options);
  //   if (options.offset === 0) {
  //     setItems(reviews);
  //   } else {
  //     setItems((prevItems) => [...prevItems, ...reviews]);
  //   }
  //   setOffset(options.offset + reviews.length);
  //   setHasNext(paging.hasNext);
  // };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getDatas("movie", options);
    } catch (error) {
      console.error(error);
      // setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    // const { reviews, lastQuery } = await getDatas("movie", options);
    const { reviews, lastQuery } = result;
    if (options.lq === undefined) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setLq(lastQuery);
    setHasNext(lastQuery);
  };

  const handleLoadMore = () => {
    handleLoad({ order, lq, limit: LIMIT });
  };

  // handleLoad();
  // 무한루프 도는 이유 : 코드를 하나씩 실행하다가 함수를 실행하는데
  // 비동기 함수니까 현재 실행되는 컴포넌트 함수와는 별도로 실행된다고 생각
  // setItems를 통해서 state를 변경한다. 그럼 리액트는 App 컴포넌트를 다시 렌더링 하기 때문에
  // handleLoad 함수를 실행시키고 다시 state 를 변경해서 다시 App 컴포넌트를 렌더링 한다. ==> 무한루프

  // request 이후에 items 를 변경할 함수
  const handleAddSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    console.log(review);
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      // debugger;
      // prevItems[splitIdx] = review;
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    // handleLoad({ order, offset: 0, limit: LIMIT });
    handleLoad({ order, lq: undefined, limit: LIMIT });
    // const func = async () => {
    //   await getImageURL(item.imgUrl).then((url) => setImgUrl(url));
    // };
    // func();
  }, [order]);
  // useEffect 는 argument로 콜백함수와 배열을 넘겨준다.
  // [] 는 dependency list 라고 하는데 위에서 handleLoad 함수가 무한루프 작동하는 이유를 설명할 때
  // App 컴포넌트가 다시 렌더링 될 때(2번째) useEffect 함수도 다시 실행하는데 이번에는
  // [] 안에 있는 값들을 앞에서 기억한 값이랑 비교한다. 비교해서 다른경우에만 콜백함수를 실행한다.(그 전에는 콜백함수를 등록만 해놓음)

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      {/* <ReviewList items={items} /> */}
      <ReviewForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={addDatas}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
      {/* <button disabled={!hasNext} onClick={handleLoadMore}>
        더 보기
      </button> */}

      {/* 
        조건부 연산자 
        AND : 앞에 나오는 값이 true 이면 렌더링
        OR : 앞에 나오는 값이 false 이면 렌더링
      */}
      {hasNext && (
        // <button disabled={!hasNext} onClick={handleLoadMore}>
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {
        // ? 표기는 Optional Chaining 이라는 표기법이다.
        // 아래와 같이 쓰면 loadingError 가 있을 때만 message 프로퍼티를 참조하겠다는 의미이다.
        // nullish 병합 연산자 '??'
        // a ?? b ==> a가 null도 아니고 undefined 도 아니면 a, 그 외의 경우는 b
        loadingError?.message && <span>{loadingError.message}</span>
      }
    </div>
  );
}

export default App;
