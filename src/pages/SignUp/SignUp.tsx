import { Link, useNavigate } from 'react-router-dom';
import { Switcher } from '../Login/LoginStyles';
import { Check, Error, Eyes, Form, InputDiv, SignUpInput, SignUpPart, SignUpWrapper, Svg } from './SignUpStyles';
import { useState } from 'react';
import EmailAuthModal from '../../components/EmailAuthModal';
import { useTheTheme } from '../../components/Theme';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/eye_off.svg';
import axios from 'axios';
import { ReactComponent as User } from '../../assets/signUp_user.svg';
import { ReactComponent as Nickname } from '../../assets/signUp_nickname.svg';
import { ReactComponent as Pw } from '../../assets/signUp_pw.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const max_length = 10;
  const [InputCount, setInputCpunt] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 상태
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { themeColor } = useTheTheme();
  const [pwType, setpwType] = useState({
    type: 'password',
    visible: false,
  });

  const handelPwType = () => {
    setpwType(() => {
      // 만약 현재 pwType.visible이 false 라면
      if (!pwType.visible) {
        return { type: 'text', visible: true };

        //현재 pwType.visible이 true 라면
      } else {
        return { type: 'password', visible: false };
      }
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'nickname') {
      //닉네임 글자 수 제한
      const sliceValue = value.slice(0, max_length);
      setNickName(sliceValue);
      setInputCpunt(sliceValue.length);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      //비밀번호 글자 수 제한
      const sliceValue = value.slice(0, max_length);
      setPassword(sliceValue);
    } else if (name === 'passwordcheck') {
      setPasswordCheck(value);
    }
  };
  const onEmailCheck = async () => {
    if (!email) {
      //인증버튼 눌렀을 때 이메일을 입력하지 않았을 경우
      alert('이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      //인증버튼 눌렀을 때 이메일 형식이 올바르지 않을 경우
      alert('유효한 이메일 주소를 입력해주세요.');
    } else {
      try {
        //이메일 인증을 위해 서버로 이메일 보내기
        // const response = await axios.post(
        //   `http://3.37.87.232:8080/api/members/emails/verification-requests?email=${email}`,
        //   { email: email },
        // );
        setIsModalOpen(true);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEmailVerificationSuccess = () => {
    setEmailVerified(true); // 인증 성공 시 상태 업데이트
  };

  const onCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫아줍니다
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || passwordCheck == '' || nickname === '' || password === '' || email === '') {
      setError('입력하지 않은 필드가 있습니다.');
    } else if (passwordCheck !== password) {
      setError('비밀번호가 일치하지 않습니다.');
      //timeout 설정할까??
      return;
    }
    // else if (!emailRegex.test(email)) {
    //   //이메일 형식이 맞지 않을 경우 에러설정
    //   //근데 이메일 인증 어차피 해야하는데 왜 필요??
    //   setError('유효한 이메일 주소를 입력해주세요.');
    //   return;
    // }
    else if (!passwordRegex.test(password)) {
      setError('비밀번호는 8~10자이며, 특수문자를 포함해야 합니다.');
      return;
    } else if (!emailVerified) {
      setError('이메일 인증이 완료되지 않았습니다.');
      return;
    }
    const userSignUp = {
      nickname: nickname,
      email: email,
      password: password,
    };
    console.log(userSignUp);
    try {
      setLoading(true);
      const response = await axios.post(`http://3.37.87.232:8080/api/members/register`, userSignUp);
      console.log(response.data);
      navigate('/login');
    } catch (e) {
      //에러 캐치
      console.log(e);
    } finally {
      //로딩 상태 해제
      //작업 상태 완료됨을 나타내고 로딩 컴포넌트를 숨길 수 있음.
      setLoading(false);
    }
    console.log(nickname, email, password);
  };
  return (
    <SignUpWrapper>
      <SignUpPart>
        <span className="text-3xl mt-9 flex justify-center font-bold">회원가입</span>
        <Form onSubmit={onSubmit}>
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
          <span className="mt-8 text-lg">이메일</span>
          <InputDiv>
            <Svg>
              <User />
            </Svg>
            <SignUpInput
              value={email}
              onChange={onChange}
              placeholder="이메일"
              name="email"
              disabled={emailVerified}
              // required
            />
            <Check type="button" onClick={onEmailCheck} disabled={emailVerified} className="text-sm">
              인증
            </Check>
            <EmailAuthModal
              isOpen={isModalOpen}
              onClose={onCloseModal}
              onVerifySuccess={handleEmailVerificationSuccess}
              theme={themeColor}
              email={email}
            />
          </InputDiv>
          <span className="mt-6 text-lg">닉네임</span>
          <InputDiv>
            <Svg>
              <Nickname />
            </Svg>
            <SignUpInput
              onChange={onChange}
              name="nickname"
              value={nickname}
              type="text"
              placeholder="닉네임"
              // required
            />
          </InputDiv>
          <span style={{ color: 'green', textAlign: 'right' }} className="text-sm">
            {InputCount.toLocaleString()}/{max_length.toLocaleString()}자
          </span>
          <span className="mt-2 text-lg">비밀번호</span>
          <InputDiv>
            <Svg>
              <Pw />
            </Svg>
            <SignUpInput
              onChange={onChange}
              name="password"
              value={password}
              type={pwType.type}
              placeholder="비밀번호"
              // required
            />
            <Eyes onClick={handelPwType}>{pwType.visible ? <Eye /> : <EyeOff />}</Eyes>
          </InputDiv>
          <span className=" mt-6 text-lg">비밀번호 확인</span>
          <InputDiv>
            <Svg>
              <Pw />
            </Svg>
            <SignUpInput
              onChange={onChange}
              name="passwordcheck"
              value={passwordCheck}
              type="password"
              placeholder="비밀번호 확인"
              // required
            />
          </InputDiv>
          <SignUpInput className="mt-10" type="submit" value={isLoading ? '로딩 중..' : '회원가입'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher className="mt-5">
          이미 회원이라면?{' '}
          <Link to="/login" className="underline">
            로그인 하러 가기 &rarr;
          </Link>
        </Switcher>
      </SignUpPart>
    </SignUpWrapper>
  );
};

export default SignUp;
