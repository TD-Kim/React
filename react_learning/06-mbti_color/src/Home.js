import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ColorSurvey from "./components/ColorSurvey";
import axios from "./lib/axios";
import styles from "./Home.module.css";
import { getMockItems } from "./lib/api";

function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const nextPageRef = useRef(null);
  const isLoadingRef = useRef(false);
  // 렌더링 이후에도 기존값을 계속 유지하기 위해서 useRef 를 사용할 수 도 있다.
  // ref 변수의 current 프로퍼티에 값을 넣어주면 렌더링 이후에도 값이 유지된다.
  async function handleLoad(mbti) {
    // const res = await axios.get("/color-surveys/", {
    //   params: { mbti, limit: 20 },
    // });
    const mockItems = getMockItems();
    // console.log(res, mockItems);
    // nextPageRef.current = res.data.next;
    nextPageRef.current = mockItems.length;
    const nextItems = mockItems;
    setItems(nextItems);
  }

  async function handleLoadNext() {
    console.log(items.length);
    // const res = await axios.get(nextPageRef.current);
    // const data = res.data;
    const data = getMockItems(nextPageRef.current);
    setItems((prevItems) => {
      console.log(prevItems.length);
      // return [...prevItems, ...data.results];
      return [...prevItems, ...data];
    });
    nextPageRef.current = data.next;
  }

  useEffect(() => {
    console.log("첫번째 useEffect");
    handleLoad(filter);
  }, [filter]);

  useEffect(() => {
    console.log("두번째 useEffect");
    async function handleScroll() {
      // console.log(!nextPageRef.current || isLoadingRef.current);
      if (!nextPageRef.current || isLoadingRef.current) return;
      isLoadingRef.current = true;
      // 여기서 잠깐, 한 가지 주의할 점이 있습니다. 이 함수는 언제 실행되어야 할까요?
      // 일단 다음 페이지가 있는 경우에만 실행해야 하고(nextPageRef.current값이 존재할 때만 실행)
      // handleScroll()이 실행되지 않는 경우에만 실행해야 합니다.
      // 이게 무슨 말이냐면, 스크롤 이벤트는 스크롤 할 때마다 계속 실행되기
      // 때문에 중복해서 실행될 수 있습니다.
      // 그래서 isLoadingRef라는 Ref Object를 만들어서 중복으로 실행되지 않도록 막아주겠습니다.
      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;
      // document.documentElement : html 요소.
      // window.innerHeight : 웹브라우저의 주소줄 아래부터 화면에 보이는 창 크기
      // document.documentElement.scrollTop : 현재 스크롤에서 가장 상단의 위치
      // scrollTop : 스크롤에 의해 가려진 영역

      const { scrollHeight, scrollTop, clientHeight, offsetHeight } =
        document.documentElement;
      const currentScrollTop = document.documentElement.scrollTop;
      // if (currentScrollTop >= maxScrollTop) {
      if (scrollTop + clientHeight >= scrollHeight) {
        await handleLoadNext();
      }
      isLoadingRef.current = false;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별{console.log("로딩")}
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            {filter && (
              <div className={styles.filter} onClick={() => setFilter(null)}>
                {filter}
                <img
                  className={styles.removeIcon}
                  src="/images/x.svg"
                  alt="필터 삭제"
                />
              </div>
            )}
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.id}>
              <ColorSurvey value={item} onClick={() => setFilter(item.mbti)} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
