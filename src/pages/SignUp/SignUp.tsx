import { Link, useNavigate } from 'react-router-dom';
import { Switcher } from '../Login/LoginStyles';
import { Check, Error, Eyes, Form, InputDiv, SignUpInput, SignUpPart, SignUpWrapper, Svg } from './SignUpStyles';
import { useEffect, useState } from 'react';
import EmailAuthModal from '../../components/EmailAuthModal/EmailAuthModal';
import { useTheTheme } from '../../components/Theme';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/eye_off.svg';
import { ReactComponent as User } from '../../assets/signUp_user.svg';
import { ReactComponent as Nickname } from '../../assets/signUp_nickname.svg';
import { ReactComponent as Pw } from '../../assets/signUp_pw.svg';
import { ReactComponent as PwCheck } from '../../assets/pwCheck.svg';
import address from '../../components/Address';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const max_length = 10;
  const [InputCount, setInputCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 상태
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { themeColor } = useTheTheme();
  const [passwordValidLength, setPasswordValidLength] = useState(false);
  const [passwordValidChar, setPasswordValidChar] = useState(false);
  const passwordRegexLength = /^.{8,10}$/; // 길이 8-10
  const passwordRegexChar = /.*[!@#$%^&*].*/; // 특수문자 포함
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

  useEffect(() => {
    setPasswordValidLength(passwordRegexLength.test(password));
    setPasswordValidChar(passwordRegexChar.test(password));
  }, [password]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'nickname') {
      //닉네임 글자 수 제한
      const sliceValue = value.slice(0, max_length);
      setNickName(sliceValue);
      setInputCount(sliceValue.length);
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
        setIsModalOpen(true);
        //이메일 인증을 위해 서버로 이메일 보내기
        const response = await address.post(`/api/members/emails/verification-requests?email=${email}`, {
          email: email,
        });
        console.log(email);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEmailVerificationSuccess = () => {
    setEmailVerified(true); // 인증 성공 시 상태 업데이트
  };

  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 600);
  };

  const onCloseModal = () => {
    setIsModalOpen(false); // 모달닫기
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || passwordCheck == '' || nickname === '' || password === '' || email === '') {
      handleError('입력하지 않은 필드가 있습니다.');
    } else if (passwordCheck !== password) {
      handleError('비밀번호가 일치하지 않습니다.');
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
      return;
    } else if (!emailVerified) {
      handleError('이메일 인증이 완료되지 않았습니다.');
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
      const response = await address.post(`/api/members/register`, userSignUp);
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
        <span className="text-3xl mt-4 flex justify-center font-bold">회원가입</span>
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
          <div
            style={{
              width: '75%',
              display: 'flex',
              color: passwordValidLength ? '#28b381' : 'gray',
            }}
          >
            <PwCheck />
            <span style={{ fontSize: '13px', marginTop: '3px', marginLeft: '2px' }}>
              영어 소문자/대문자 길이 8~10자
            </span>
          </div>

          <div
            style={{
              width: '75%',
              display: 'flex',
              color: passwordValidChar ? '#28b381' : 'gray',
            }}
          >
            <PwCheck />
            <span style={{ fontSize: '13px', marginTop: '3px' }}>특수문자 포함</span>
          </div>
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
        <Error className="mt-2">{error}</Error>
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
