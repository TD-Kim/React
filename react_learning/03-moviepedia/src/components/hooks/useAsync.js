// 커스텀 Hook은 리액트 Hook을 실행하는 함수이기 때문에

import { useState } from "react";

// 이름의 규칙을 따라야 한다.
function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async () => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction]; // 로딩 상태, 에러 그리고 콜백을 실행할 수 있는 함수를 배열 형태로 리턴한다.
}

export default useAsync;
