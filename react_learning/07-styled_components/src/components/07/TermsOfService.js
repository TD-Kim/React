// TermsOfService는 JSX 문법을 직접 사용해서 바로 컴포넌트가 만들어졌다.
// 이 컴포넌트를 styled() 함수로 감싸보자.

// styled()로 지정한 스타일이 적용되지 않는다. StyledTermsOfService에
// 지정한 배경색이랑 너비가 적용이 안 된 거 같네요. 왜 그럴까?
// Styled Components는 내부적으로 className을 따로 생성한다. 그리고,
// 자체적으로 생성된 className이 있는 부분에 styled() 함수의 스타일이 입혀진다.
// 그런데, JSX 문법으로 직접 만든 컴포넌트는 styled() 함수가 적용될 className에
// 대한 정보가 없는데요. styled() 함수에서 지정한 스타일이 입혀질 부분이
// 어딘지 알 수 없으니 스타일이 적용되지 않은 것이다.
// 이렇게, Styled Components를 사용하지 않고 직접 만든 컴포넌트는 className
// 값을 Prop으로 따로 내려줘야 styled() 함수를 사용할 수 있다.

// function TermsOfService() {
function TermsOfService({ className }) {
  return (
    <div className={className}>
      <h1>DW온라인스쿨 서비스 이용약관</h1>
      <p>
        환영합니다.
        <br />
        DWOS이 제공하는 서비스를 이용해주셔서 감사합니다. 서비스를 이용하시거나
        회원으로 가입하실 경우 본 약관에 동의하시게 되므로, 잠시 시간을 내셔서
        주의 깊게 살펴봐 주시기 바랍니다.
      </p>
      <h2>제 1 조 (목적)</h2>
      <p>
        본 약관은 DW온라인스쿨이 운영하는 기밀문서 관리 프로그램인 DWOS에서
        제공하는 서비스를 이용함에 있어 이용자의 권리, 의무 및 책임사항을
        규정함을 목적으로 합니다.
      </p>
    </div>
  );
}

export default TermsOfService;
