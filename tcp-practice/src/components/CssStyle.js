import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './styles.css';
import style1 from './FirstModule.module.css';
import style2 from './SecondModule.module.css';
import classNames from 'classnames/bind';
import styled, { css } from 'styled-components';

const Css = () => {
  //   const appStyle = {
  //     textAlign: "left",
  //   };

  //   const headerStyle = {
  //     backgroundColor: "black",
  //     color: "yellow",
  //     textAlign: "center",
  //   };

  //   const titleStyle = {
  //     textDecoration: "underline",
  //     textShadow: "4px 1px #9c9c9c",
  //   };
  return (
    <div>
      <p>
        React에서는 웹 페이지와는 달리 인라인 스타일을 적용할 때 style
        속성값으로 일반 문자열이 아닌 <br></br>
        자바스크립트 객체를 할당해야만 하고, CSS 속성명을 카멜
        표기법(CamelCase)으로 바꿔 작성해야만 한다.
      </p>
      {/* <div style={appStyle}>
        <header style={headerStyle}>
          <h3 style={titleStyle}>Hello, React!</h3>
        </header>
      </div> */}
      <div className='App'>
        <header className='App-header'>
          <h3 className='App-title'>Hello, React!</h3>
        </header>
      </div>
      <p>
        하지만 React 애플리케이션의 주요 스타일링 방식으로 style 속성을 활용한
        <br></br>
        인라인 스타일링만을 사용하는 것은 유지보수 측면이나 성능 상의 이유로
        권장하지 않으며, <br></br>style 속성은 렌더링될 때 동적으로 스타일을
        추가하기 위해서만 사용하는 것이 좋습니다.
      </p>
      <p>
        따라서 인라인 스타일링 보다는 일반적으로 별도의 파일에 스타일을 정의해
        놓고, <br></br>className 속성을 사요하여 외부 CSS stylesheet 에 정의된
        클래스를 참조하는 방식이 주로 사용된다.
      </p>
    </div>
  );
};

const Sass = () => {
  return (
    <div>
      <h3>Sass(Syntactically Awesome Stylesheet) 와 Scss(Sassy CSS)</h3>
      <p>
        Sass는 크게 Sass와 SCSS로 구분할 수 있습니다. SCSS는 Sassy CSS(Sass한
        듯한 CSS)의 줄임말로 Sass보다 늦게 개발되었지만, 좀 더 넓은 범용성과
        CSS와의 완벽한 호환성이라는 장점을 가지고 있어서 현재 널리 사용되고
        있습니다. 두 문법 사이의 가장 큰 차이점으로는 Sass는 들여쓰기를 사용하여
        중첩을 표현하고, 속성들을 줄바꿈으로 구분합니다. 하지만 SCSS는 중괄호({}
        )를 사용하여 중첩을 표현하고, 속성들을 세미콜론(;)으로 구분합니다.
      </p>
      {/* 
        $primary-color: #93BFCF;
        $secondary-color: #6096B4; -> SCSS 변수 문법
          nav {
            ul {
                margin: 0;
                list-style: none;
            }

            li { display: inline-block; }

            a {
                display: block;
                padding: 6px 12px;
            }
        } */}
    </div>
  );
};

const CssModule = () => {
  const FirstModule = () => {
    const cx = classNames.bind(style1);
    let isHovered = false;
    return (
      <div className={cx('wrapper', { h1: isHovered })}>
        {/* <div className={`${style1.wrapper} ${style1.h1 && isHovered}`}> */}
        {/* <div className={[style1.wrapper, style1.h1].join(" ")}> */}
        {/* <div className={`${style1.wrapper} ${style1.h1}`}> */}
        <h1>Hello, React!</h1>
      </div>
    );
  };
  const SecondModule = () => {
    return (
      <div className={style2.wrapper}>
        <h1>Hello, React!</h1>
      </div>
    );
  };
  return (
    <div>
      <h3>CSS Module</h3>
      <p>
        외부 CSS 파일을 참조하는 방식은 React 애플리케이션의 규모가 커질수록
        여러 컴포넌트에서 사용된 CSS 클래스명이 서로 중복될 가능성이 높아진다.
        만약 서로 다른 두 개의 CSS 파일에 동일한 이름의 CSS 클래스가 정의되어
        있다면, 해당 클래스가 적용된 React 엘리먼트는 이 두 스타일이 모두
        한꺼번에 적용된다. 이와 같은 문제점을 해결하기 위해 CSS Module을 사용할
        수 있다. CSS Module은 CSS 클래스를 불러와 사용할 때 클래스명을 고유한
        이름으로 자동 변환해줌으로써 CSS 클래스명이 서로 중첩되는 현상을 미연에
        방지해 주는 기술이다. React에서 CSS Module을 적용하는 방법은 아주
        간단하다. 별도의 설정 없이 CSS Module을 적용하고 싶은 CSS 파일의 이름을
        아래와 같은 방식으로 작성하기만 하면 자동으로 적용된다.
        [모듈명].module.css
      </p>
      <FirstModule />
      <SecondModule />
      <p>
        위의 예제와 같이 CSS Module을 사용하면 이미 다른 CSS 파일에 wrapper
        클래스가 정의되어 있더라도 해당 CSS 파일에 정의된 wrapper 클래스는 전혀
        영향을 받지 않게 된다. 최종적으로 렌더링된 웹 페이지를 개발자 도구로
        확인해 보면 각 컴포넌트에 적용된 클래스명이 우리가 작성한 wrapper라는
        이름이 아닌 해시(hash) 값이 뒤에 붙은 고유한 클래스명으로 변경되어 있는
        것을 확인할 수 있다. <br></br>자동으로 생성된 고유한 클래스명<br></br>
        [파일명]_[클래스명]__[해시값]
      </p>
      <h4>classnames</h4>
      <p>
        classnames 이와 같은 문제점을 해결하기 위해 많은 개발자들이 CSS Module을
        사용하는 경우에 classnames 라이브러리를 함께 사용하고 있다. classnames
        라이브러리는 CSS 클래스를 동적으로 설정하는 조건부 스타일링 작업에 매우
        유용한 라이브러리이며, CSS Module에서 여러 개의 클래스를 동시에 적용할
        때 매우 편리하게 사용할 수 있다. React에서 classnames를 사용하기
        위해서는 우선 classnames 라이브러리를 설치해야 한다. <br></br>Shell #
        npm인 경우 npm install classnames
      </p>
    </div>
  );
};

const StyledComp = () => {
  //   const ButtonOne = styled.button`
  //     padding: 6px 12px;
  //     margin: 10px;
  //     border: 2px solid orange;
  //     color: orange;
  //     font-size: 1rem;
  //   `;

  // Tagged 템플릿 리터럴
  //   const ButtonOne = styled.button`
  //     padding: 6px 12px;
  //     margin: 10px;
  //     border: 2px solid ${(props) => props.color};
  //     color: ${(props) => props.color};
  //     font-size: 1rem;
  //   `;

  // css prop를 활용한 조건부 스타일링
  // Tagged 템플릿 리터럴을 사용하면 props 값에 따라 서로 다른 스타일의
  // React 컴포넌트를 생성할 수 있다.
  // 하지만 props에 따라 바꾸고 싶은 CSS 속성이 하나가 아니라 여러 개일 경우에는
  // styled-components에서 제공하는 css prop을 사용하여 여러 개의 CSS 속성을
  // 하나로 묶어서 정의할 수 있다. css prop을 사용하기 위해서는 먼저 styled-components 패키지에서
  // css를 불러와야 한다.
  const ButtonOne = styled.button`
    padding: 6px 12px;
    margin: 10px;
    border: 2px solid ${(props) => props.color};
    color: ${(props) => props.color};
    font-size: 1rem;

    ${(props) =>
      props.bold &&
      css`
        color: ${(props) => props.color};
        font-weight: 600;
        border: 4px solid ${(props) => props.color};
      `}
  `;
  const ButtonTwo = styled(ButtonOne)`
    border: 4px solid green;
    color: green;
  `;
  return (
    <div>
      <h3>styled-components</h3>
      <p>
        styled-components는 React에서 사용되고 있는 CSS-in-JS 방식의 라이브러리
        중에서 가장 많이 사용되고 있는 라이브러리이다. React에서
        styled-components를 사용하기 위해서는 우선 styled-components
        라이브러리를 설치해야 한다.<br></br>
        Shell # npm인 경우 npm install styled-components
      </p>
      <div>
        <ButtonOne color='red'>빨간색 버튼</ButtonOne>
        <ButtonOne color='orange' bold>
          오렌지색 버튼
        </ButtonOne>
        {/* <ButtonTwo>초록색 버튼</ButtonTwo> */}
      </div>
    </div>
  );
};

const List = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to=''>CSS</Link>
        </li>
        <li>
          <Link to='sass'>Sass</Link>
        </li>
        <li>
          <Link to='cssModule'>CSS Module</Link>
        </li>
        <li>
          <Link to='styledComp'>styled-components</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const CssStyle = () => {
  return (
    <>
      <h3>컴포넌트 스타일링</h3>
      <Routes>
        <Route path='' element={<List />}>
          <Route path='' element={<Css />} />
          <Route path='sass' element={<Sass />} />
          <Route path='cssModule' element={<CssModule />} />
          <Route path='styledComp' element={<StyledComp />} />
        </Route>
      </Routes>
    </>
  );
};

export default CssStyle;
