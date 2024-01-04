import styled from 'styled-components';
import LoginButton from '../components/LoginButton';
import Input from '../components/Input';
import Label from '../components/Label';
import Link from '../components/Link';
import KakaoButton from '../components/KakaoButton';
import { useState } from 'react';
import { getData } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

// const Logo = styled.img`
//   display: block;
//   margin: 16px auto;
//   width: 200px;
// `;

const Logo = styled.h1`
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  color: transparent;
`;

const Description = styled.div`
  color: #848187;
  text-align: center;
`;

const Container = styled.div`
  width: 400px;
  margin: 40px auto;

  ${Input} {
    margin-bottom: 16px;
  }

  ${LoginButton} {
    width: 100%;
    margin: 8px 0;
  }
`;

function Login() {
  const [values, setValues] = useState({});
  const {state} = useLocation();
  console.log(state)
  const navigate = useNavigate();

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setValues((prevValues) => ({...prevValues, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = await getData("member", 'id', '==', values.id);
    
    if(memberData.length == 0) {
      alert("아이디가 존재하지 않습니다.");
      return;
    }

    if(memberData[0].password !== values.password){
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      localStorage.setItem("token", memberData[0].docId);
      localStorage.setItem("courseList", memberData[0].courseList);
      navigate(state);
    }
    
  }

  return (
    <Container>
      {/* <Logo src={codeitLogo} alt='codeit' /> */}
      <Logo>DW 온라인스쿨</Logo>
      <Description>
        회원이 아니신가요? <Link href='#'>회원가입 하기</Link>
      </Description>
      <form onSubmit={handleSubmit}>
        <Label htmlFor='email'>이메일</Label>
        <Input
          type='email'
          id='email'
          name='id'
          placeholder='styled@DW.kr'
          onChange={handleValueChange}
        />
        <Label htmlFor='password'>비밀번호</Label>
        <Input
          type='password'
          id='password'
          name='password'
          placeholder='비밀번호'
          onChange={handleValueChange}
        />
        <LoginButton type='submit'>로그인 하기</LoginButton>
      </form>
      <KakaoButton />
    </Container>
  );
}

export default Login;
