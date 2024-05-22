interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onPasswordChange?: (newPassword: string) => void;
  theme: string;
}

import React, { useEffect, useState } from 'react';
import '../../components/Animation.css';
import { CancleBtn, ConfirmDiv, ConfirmWrapper, Eyes, SaveBtn } from './ConfirmPwStyles';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/eye_off.svg';
import { ReactComponent as PwCheck } from '../../assets/pwCheck.svg';
import address from '../Address';

const Modal: React.FC<ModalProps> = ({ isOpen, children, theme }) => {
  const backgroundColor = theme === 'light' ? 'white' : '#1C2631';

  if (!isOpen) return null;

  return (
    <ConfirmDiv
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        width: '100%',
        border: 'none',
        zIndex: '10',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <ConfirmDiv
        style={{
          position: 'absolute',
          borderRadius: '5px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: backgroundColor,
          width: '30%',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '60%',
        }}
      >
        {children}
      </ConfirmDiv>
    </ConfirmDiv>
  );
};

const Confirmpassword: React.FC<ModalProps> = ({ isOpen, onClose, theme, onPasswordChange }) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [changePw, setChangePw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const max_length = 10;
  const [passwordValidLength, setPasswordValidLength] = useState(false);
  const [passwordValidChar, setPasswordValidChar] = useState(false);
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,10}$/;
  const passwordRegexLength = /^.{8,10}$/; // 길이 8-10
  const passwordRegexChar = /.*[!@#$%^&*].*/; // 특수문자 포함
  const [pwType, setpwType] = useState({
    type: 'password',
    visible: false,
  });

  const handelPwType = () => {
    setpwType(() => {
      if (!pwType.visible) {
        return { type: 'text', visible: true };
      } else {
        return { type: 'password', visible: false };
      }
    });
  };

  useEffect(() => {
    setPasswordValidLength(passwordRegexLength.test(changePw));
    setPasswordValidChar(passwordRegexChar.test(changePw));
  }, [changePw]);

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'pw') {
      const sliceValue = value.slice(0, max_length);
      setPassword(sliceValue);
    } else if (name === 'changePw') {
      const sliceValue = value.slice(0, max_length);
      setChangePw(sliceValue);
    } else if (name === 'confirmPw') {
      const sliceValue = value.slice(0, max_length);
      setConfirmPw(sliceValue);
    }
  };
  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == '' || changePw === '' || confirmPw === '') {
      handleError('입력하지 않은 필드가 있습니다.');
      return;
    } else if (!passwordRegex.test(changePw)) {
      return;
    } else if (changePw !== confirmPw) {
      handleError('변경할 비밀번호가 일치하지 않습니다.');
      return;
    } else if (changePw == password) {
      handleError('변경할 비밀번호가 현재 비밀번호와 일치합니다.');
      return;
    }
    try {
      console.log(password);
      const response = await address.post('/api/members/verify-password', {
        password: password,
      });
      console.log(response.data);
      if (onPasswordChange) {
        onPasswordChange(changePw);
        // onPasswordChange가 정의되어 있는 경우에만 호출
      }
      enhancedOnClose();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const enhancedOnClose = () => {
    setpwType(() => {
      return { type: 'password', visible: false };
    });
    setChangePw('');
    setConfirmPw('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} theme={theme}>
        <ConfirmWrapper onSubmit={handleSubmit}>
          <span className="font-semibold mt-3 bounce" style={{ width: 'auto', fontSize: '20px' }}>
            <span style={{ color: '#28b381', fontSize: '20px' }}>암호</span> 변경
          </span>
          <span className="mt-5">현재 비밀번호</span>
          <ConfirmDiv>
            <input name="pw" onChange={OnChange} type="password" value={password} />
          </ConfirmDiv>
          <span className="mt-5">변경 비밀번호</span>
          <ConfirmDiv style={{ position: 'relative' }}>
            <input name="changePw" type={pwType.type} onChange={OnChange} value={changePw} />
            <Eyes onClick={handelPwType}>{pwType.visible ? <Eye /> : <EyeOff />}</Eyes>
          </ConfirmDiv>
          <div
            style={{
              width: '100%',
              display: 'flex',
              color: passwordValidLength ? '#28b381' : 'gray',
            }}
          >
            <PwCheck />
            <span style={{ fontSize: '13px', marginTop: '3px', marginLeft: '2px' }}>길이 8~10자</span>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              color: passwordValidChar ? '#28b381' : 'gray',
            }}
          >
            <PwCheck />
            <span style={{ fontSize: '13px', marginTop: '3px' }}>특수문자 포함</span>
          </div>
          <span className="mt-5">비밀번호 확인</span>
          <ConfirmDiv>
            <input name="confirmPw" onChange={OnChange} type="password" value={confirmPw} />
          </ConfirmDiv>
          <p className="text-xs text-red-500">{error}</p>
          <ConfirmDiv
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-evenly',
              border: 'none',
              backgroundColor: 'inherit',
            }}
            className="mt-7"
          >
            <SaveBtn>확인</SaveBtn>
            <CancleBtn type="button" onClick={enhancedOnClose}>
              취소
            </CancleBtn>
          </ConfirmDiv>
        </ConfirmWrapper>
      </Modal>
    </>
  );
};

export default Confirmpassword;
