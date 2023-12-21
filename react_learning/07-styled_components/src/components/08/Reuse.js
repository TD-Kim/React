import styled, { css } from 'styled-components';

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const fontSize = css`
  font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px;
`;

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #ffffff;
  padding: 16px;
  ${fontSize};
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px; */
`;

const Input = styled.input`
  border: 2px solid #eeeeee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  ${fontSize};
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px; */
`;

const Container = styled.div`
  ${Button}, ${Input} {
    margin: 10px;
  }
`;

function Reuse() {
  return (
    <Container>
      <h2>Button</h2>
      <Button size='small'>small</Button>
      <Button size='medium'>medium</Button>
      <Button size='large'>large</Button>

      <h2>Input</h2>
      <Input size='small' />
      <Input size='medium' />
      <Input size='large' />
    </Container>
  );
}

export default Reuse;
