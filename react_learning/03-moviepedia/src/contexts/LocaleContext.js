import { createContext, useContext, useState } from 'react';

// 이 함수는 아규먼트로 Context가 제공할 기본값을 받는다.
const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaultValue);
  // 아래 provider 의 value 는 State 값을 바꾸는 것도 반드시 Context를 통해서 하려고.
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// 매번 useContext와 LocaleContext를 가지고 사용하는건 번거로우니 custom Hook 을 만든다. 오류처리도 해줄 수 있는 장점이 있다.
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }

  // const { locale } = context;

  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }

  // const { setLocale } = context;

  return context.setLocale;
}

// export default LocaleContext;
