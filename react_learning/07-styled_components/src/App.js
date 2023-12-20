import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
// import Container from './Container';
import DynamicButton from './DynamicButton';

// 5
const Container = styled.div`
  /* 5 
    ${DynamicButton} {
    margin: 10px;
  } */

  /* 6 */
  ${Input} {
    margin: 8px;
  }
`;

function App() {
  return (
    <div>
      {/* 1 
      <Button>Hello Styled!</Button>
      */}
      {/* 3 <Input /> */}
      {/* 4 
      <Container>
        <h1>로그인</h1>
        <label htmlFor='email'>Email</label>
        <Input type='email' id='email' placeholder='styled@dw.kr' />
        <label htmlFor='password'>Password</label>
        <Input type='password' id='password' placeholder='비밀번호' />
      </Container>
      */}
      {/* 5 
      <Container>
        <h1>기본 버튼</h1>
        <DynamicButton size='small'>small</DynamicButton>
        <DynamicButton size='medium'>medium</DynamicButton>
        <DynamicButton size='large'>large</DynamicButton>
        <h1>둥근 버튼</h1>
        <DynamicButton size='small' $round={true}>
          round small
        </DynamicButton>
        <DynamicButton size='medium' $round={true}>
          round medium
        </DynamicButton>
        <DynamicButton size='large' $round={true}>
          round large
        </DynamicButton>
      </Container>
      */}
      {/* 6 */}
      <Container>
        <h2>Size</h2>
        <Input size='small' />
        <Input size='medium' />
        <Input size='large' />
        <h2>Round</h2>
        <Input $round />
        <h2>Error</h2>
        <Input $error />
      </Container>
    </div>
  );
}

export default App;
