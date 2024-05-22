import { LoginWrapper, LoginLogo, LoginPart, Input, Logindiv, Switcher, Explain } from './LoginStyles';
import { ReactComponent as DarkLogo } from '../../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../../assets/logo-dark.svg';
import { FontColor, Highlight, Phrases, Text } from '../FirstMain/FirstMainStyles';
import { useTheTheme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Error } from '../SignUp/SignUpStyles';
import useAuthStore from '../../state/AuthStore';
import address from '../../components/Address';

const Login = () => {
  const navigate = useNavigate();
  const { themeColor } = useTheTheme();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAuthInfo = useAuthStore(state => state.setAuthInfo);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || password === '' || email === '') return;
    //백엔드로 보낼 객체
    const user = {
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      //axios써서 post로 보내기
      //유저 정보 받아오고 업데이트해주기
      const response = await address.post('/api/members/login', user);
      const { email, nickname, memberId } = response.data;
      setAuthInfo(email, nickname, memberId);
      // response.data에서 닉네임, 이메일 저장해서 main이랑 mypage에 사용
      // localStorage.setItem('accessToken', response.data.accessToken);
      // localStorage.setItem('refreshToken', response.data.refreshToken);
      // alert('로그인 성공');
      //유저정보에 없거나 비밀번호,아이디 틀리면 에러바로 뜨게
      //메인으로 가게 해야함
      navigate(`/main/${memberId}`);
    } catch (e) {
      //에러 캐치
      setError('아이디 또는 비밀번호를 잘못 입력했습니다.다시 확인해주세요.');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginWrapper>
      <LoginLogo>
        <Phrases>
          <div className="flex justify-center mb-8">
            <Link to="/">{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</Link>
          </div>
          <span>
            <Highlight>C</Highlight>ollaborative
          </span>
          <span>
            <Highlight>O</Highlight>nline
          </span>
          <span>
            <Highlight>C</Highlight>oding
          </span>
          <span>
            <Highlight>O</Highlight>rganizer
          </span>
          <div className="flex justify-center">
            <FontColor className="text-2xl mt-4">
              <Text>&quot;</Text>커뮤니티를 잇다<Text>,</Text>코딩을 넘어<Text>&quot;</Text>
            </FontColor>
          </div>
          <Explain className="text-sm mt-4">
            <span>
              COCO는 소통을 중시하는 사용자들을 위한
              <br /> 온라인 코딩의 미래를 모색합니다.
              <br />
              함께하는 코딩이 새로운 차원으로 확장되며,
              <br /> 사용자들 간의 연결을 위한 새로운 시작을 제공합니다.
            </span>
          </Explain>
        </Phrases>
      </LoginLogo>
      <LoginPart>
        <style>
          {/* 자동완성시 autofill 조정 */}
          {`
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:active {
                -webkit-text-fill-color: #000;
                -webkit-box-shadow: 0 0 0px 1000px #fff inset;
                box-shadow: 0 0 0px 1000px #fff inset;
              transition: background-color 5000s ease-in-out 0s;}

            input:autofill,
            input:autofill:hover,
            input:autofill:focus,
            input:autofill:active {
              -webkit-text-fill-color: #000;
                -webkit-box-shadow: 0 0 0px 1000px #fff inset;
                box-shadow: 0 0 0px 1000px #fff inset;
                transition: background-color 5000s ease-in-out 0s;}`}
        </style>
        <Logindiv onSubmit={onSubmit}>
          <span className="mb-5 text-lg">이메일</span>
          <Input
            onChange={onChange}
            name="email"
            placeholder="이메일"
            type="email"
            required
            className="mb-14 text-black"
          />
          <span className="mb-5 text-lg">비밀번호</span>
          <Input
            onChange={onChange}
            name="password"
            placeholder="비밀번호"
            type="password"
            required
            className="mb-14 text-black"
          />
          <Input type="submit" value="로그인" />
        </Logindiv>
        {error !== '' ? <Error className="mt-2">{error}</Error> : null}
        <Switcher className="mt-7">
          아직 회원이 아니라면?{' '}
          <Link to="/signup" className="underline">
            회원가입 하러 가기 &rarr;
          </Link>
        </Switcher>
      </LoginPart>
    </LoginWrapper>
  );
};

export default Login;
