import styled from 'styled-components';

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #ffffff;
  font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px;
  padding: 16px;

  ${({ round }) =>
    round
      ? `
      border-radius: 9999px;
    `
      : `
      border-radius: 3px;
    `}

  &:hover,
  &:active {
    background-color: #463770;
  }
`;

export default Button;
