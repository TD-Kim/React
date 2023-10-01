import { Fragment } from "react";

const JSX = () => {
  return (
    <Fragment>
      <h1>JSX 문법</h1>
      <ul>
        <li>fragment</li>
        <li>자바스크립트 표현식</li>
        <li>JSX 주석</li>
        {
          // 이렇게 주석을 작성하던지,
        }
        {/* 이렇게 주석을 작성해야한다. */}
        <li>
          <dl>
            <dt>1. DOM 속성</dt>
            <dd>
              React에서는 모든 DOM 속성(attribute)을 카멜 표기법(camelCase)으로
              표현합니다. 예를 들어, HTML 속성인 maxlength를 React에서는
              maxLength로 표기해야 합니다. 예외적으로 aria-* 와 data-* 속성은
              소문자로 표기하며, 사용자 지정 속성도 소문자로만 표기합니다.
              그리고 HTML과는 다르게 표기해야 올바르게 동작하는 몇몇 DOM 속성도
              존재합니다.
            </dd>
            <dt>2. className</dt>
            <dd>
              JSX에서는 class 대신 className이라는 속성을 사용해야 합니다.
              이것은 class라는 단어가 자바스크립트 문법에서 클래스(class)를
              생성하기 위한 키워드로 이미 예약되어 있기 때문에 중복을 피하기
              위해 className을 사용해야 합니다.
            </dd>
            <dt>3. htmlFor</dt>
            <dd>
              HTML의 for 속성도 자바스크립트에서 반복문을 정의하는 for 키워드와
              중복되므로, JSX에서는 htmlFor 속성으로 바꿔 사용해야 합니다. ex)
              label 태그의 for 속성
            </dd>
          </dl>
        </li>
      </ul>
    </Fragment>
  );
};

export default JSX;
