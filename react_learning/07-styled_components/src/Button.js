import styled from 'styled-components';
import nailImg from './nail.png';

// 2 - StyledButton 안에서 Icon 을 참조하고 있기 때문에 코드가 더 위에 위치해야한다.
const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

// 1 - styled.tagname의 tagname 부분에는 스타일을 적용할 HTML 태그 이름을 쓴다.
// const Button = styled.button`
const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  color: #ffffff;
  padding: 16px;

  /* 2 */
  &:hover,
  &:active {
    background-color: #463770;

    ${Icon} {
      opacity: 0.2;
    }
  }

  /* 2 */
  & ${Icon} {
    margin-right: 4px;
  }
`;

// 2
function Button({ children, ...buttonProps }) {
  return (
    <StyledButton {...buttonProps}>
      <Icon src={nailImg} alt='nail icon' />
      {children}
    </StyledButton>
  );
}

export default Button;
