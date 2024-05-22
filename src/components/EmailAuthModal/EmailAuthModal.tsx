interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onVerifySuccess?: () => void;
  theme: string;
  email?: string;
}

import React, { useEffect, useRef, useState } from 'react';
import '../../components/Animation.css';
import address from '../Address';
import { EmailDiv, ModalContent } from './EmailAuthModalStyles';

const Modal: React.FC<ModalProps> = ({ isOpen, children, theme, onClose }) => {
  const backgroundColor = theme === 'light' ? 'white' : '#1C2631';

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <EmailDiv onClick={handleBackgroundClick}>
      <ModalContent
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: backgroundColor,
          borderRadius: '5px',
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%',
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </EmailDiv>
  );
};

const EmailAuthModal: React.FC<ModalProps> = ({ isOpen, onClose, onVerifySuccess, theme, email }) => {
  const [code, setCode] = useState(new Array(5).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // 초 단위
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const enhancedOnClose = () => {
    setError('');
    setCode(new Array(5).fill(''));
    onClose();
  };

  useEffect(() => {
    // 모달이 열려있을 때만 타이머를 시작
    if (isOpen) {
      setTimeLeft(600);
      setError('');
      setCode(new Array(code.length).fill(''));
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft === 0) {
      setMinute(0);
      setSecond(0);
      setError('인증 시간이 만료되었습니다.');
      const timer = setTimeout(() => {
        enhancedOnClose();
      }, 2000); //3초 후에 닫힘
      return () => clearTimeout(timer);
    } else if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); //1초마다 1씩 줄어듦
      setMinute(Math.floor(timeLeft / 60));
      setSecond(timeLeft % 60);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    if (index < 4 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    // 모든 필드가 채워졌는지 확인
    if (code.every(digit => digit.length === 1) && code.length === 5) {
      const timer = setTimeout(() => {
        handleSubmit(code.join('')); // 코드 조합 후 제출 함수 호출
      }, 150);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [code]); // 코드 상태가 변경될 때마다 실행

  const handleSubmit = async (fullCode: string) => {
    try {
      const response = await address.get(`/api/members/emails/verifications?email=${email}&code=${fullCode}`);
      console.log(response.data.data.verified);
      console.log(fullCode);
      if (response.data.data.verified) {
        if (onVerifySuccess) {
          onVerifySuccess(); // 부모 컴포넌트에서 전달받은 콜백 함수 호출
        }
        enhancedOnClose();
        alert('이메일 인증 성공');
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      console.log(error);
      setError('알맞지 않은 코드입니다.');
      setTimeout(() => {
        setError('');
      }, 600);
      inputRefs.current[0]?.focus();
    }
    setCode(new Array(code.length).fill('')); //모두 빈 문자열로 초기화
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} theme={theme}>
      <h2 className="bounce mb-20">
        <span style={{ color: '#28b381', fontWeight: '600' }}>메일 </span>
        인증 코드를 입력하세요
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '15px',
          height: 'auto',
          width: 'max-content',
          padding: '0px 10px 0px 10px',
        }}
      >
        {/* 스피너 제거 */}
        <style>
          {`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}
        </style>
        {code.map((c, idx) => (
          <input
            key={idx}
            ref={el => (inputRefs.current[idx] = el)}
            type="number"
            value={c}
            maxLength={1}
            style={{
              textAlign: 'center',
              height: '200%',
              backgroundColor: '#d8dfe378',
              width: '40px',
            }}
            onChange={e => handleInputChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(idx, e)}
            onFocus={e => e.target.select()}
          />
        ))}
      </div>
      <p style={{ marginTop: '100px', fontSize: '16px' }}>
        남은 시간: {minute > 0 ? `${minute}분 ` : ''}
        {second}초
      </p>
      <p className="text-sm text-red-500">{error}</p>
    </Modal>
  );
};

export default EmailAuthModal;
