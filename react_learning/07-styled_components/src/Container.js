import styled from 'styled-components';
import Input from './Input';

const Container = styled.div`
  margin: 0 auto;
  width: 400px;

  ${Input} {
    box-sizing: border-box;
    display: block;
    margin: 8px 0 16px;
    width: 100%;
  }
`;

export default Container;
