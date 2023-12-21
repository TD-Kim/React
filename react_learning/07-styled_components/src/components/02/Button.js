import styled from 'styled-components';
import nailImg from './nail.png';

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled.button`
  /* 1 */
  background-color: #6750a4;
  border: none;
  color: #ffffff;
  padding: 16px;

  &:hover,
  &:active {
    background-color: #463770;

    /* 2 */
    ${Icon} {
      opacity: 0.2;
    }
  }

  /* 2 */
  & ${Icon} {
    margin-right: 4px;
  }
`;

function Button({ children, ...buttonProps }) {
  return (
    <StyledButton>
      <Icon src={nailImg} alt='nail icon'></Icon>
      {children}
    </StyledButton>
  );
}

export default Button;
