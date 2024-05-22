import { useRef, useState } from 'react';
import { AttendanceDiv, UserInfo, MainPageWrapper, UserInput, EditUser, Edit, Save } from './MypageStyles';
// import api from '../../components/Api';
import { useNavigate } from 'react-router-dom';
import Confirmpassword from '../../components/ConfirmPw/ConfirmPw';
import { useTheTheme } from '../../components/Theme';
import useAuthStore from '../../state/AuthStore';
import address from '../../components/Address';
import AttendanceCalendar from '../../components/AttendanceCalendar/AttendanceCalendar';

const MyPage = () => {
  const navigate = useNavigate();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const nickNameRef = useRef<HTMLInputElement>(null);
  // const { email, nickname } = useAuthStore();
  const { nickname, email, setAuthInfo, memberId } = useAuthStore(state => ({
    nickname: state.nickname,
    email: state.email,
    setAuthInfo: state.setAuthInfo,
    memberId: state.memberId,
  }));

  const [nickName, setNickname] = useState(nickname); //저장소에서 받아오기
  const [password, setPassword] = useState('1234'); //서버에서 받아오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { themeColor } = useTheTheme();

  const handleEditClick = (name?: string) => {
    setIsReadOnly(!isReadOnly);
    if (name === 'nickname') {
      if (nickNameRef.current) {
        nickNameRef.current.focus(); // 입력 필드에 포커스 설정
      }
    } else {
      setIsModalOpen(true);
    }
  };
  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nickname') {
      setNickname(value);
    }
  };
  const onCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫아줍니다
  };
  // const handlePasswordChange = (newPassword: string) => {
  //   setPassword(newPassword);
  // };
  //저장버튼 눌렀을 때 현재 상태 서버로 전송
  const handleSaveClick = async () => {
    try {
      // 서버에 데이터를 POST 요청으로 보내는 예시
      const response = await address.put('api/members/profile', {
        nickname: nickName,
        password: password,
        memberId: memberId,
      });
      console.log(response.data.nickname);
      // setNickname(response.data.nickname);
      setAuthInfo(email, response.data.nickname, memberId);
      // if (response.status === 200) {
      //   alert('정보가 성공적으로 업데이트되었습니다.');
      // } else {
      //   alert('업데이트에 실패했습니다.');
      // }ㅌ
    } catch (error) {
      // const err = error as Error;
      // if (err.message === ('Token expired' || 'Unauthorized or token expired')) {
      //   // 요청 인터셉터에서 발생한 토큰 만료 에러
      //   alert('Session expired, please login again.');
      //   navigate('/login'); // 사용자를 로그인 페이지로 이동
      // } else {
      console.error('업데이트 중 오류 발생');
      // }
    }
  };
  return (
    <MainPageWrapper>
      <span className="text-2xl font-semibold mt-5">My Page</span>
      <AttendanceDiv className="mt-3">
        <span className="text-xl font-semibold" style={{ marginLeft: '30px', marginTop: '15px' }}>
          어서오세요, {nickname}님
        </span>
        <div
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AttendanceCalendar />
        </div>
      </AttendanceDiv>
      <UserInfo>
        <span className="text-lg mt-4 font-semibold">회원정보</span>
        <EditUser>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              height: '25%',
              paddingLeft: '20px',
            }}
          >
            <span>이메일</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* 이메일 정보 받아오기 */}
              <UserInput style={{ backgroundColor: '#D9D9D9' }} readOnly value={email} />
              <div style={{ height: '25px', width: '30px' }} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              height: '25%',
              paddingLeft: '20px',
            }}
          >
            <span>닉네임</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserInput
                readOnly={isReadOnly}
                value={nickName}
                name="nickname"
                type="text"
                onChange={OnChange}
                ref={nickNameRef}
                onBlur={() => setIsReadOnly(true)}
              />
              <Edit onClick={() => handleEditClick('nickname')} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              height: '25%',
              paddingLeft: '20px',
            }}
          >
            <span>비밀번호</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserInput
                style={{ backgroundColor: '#D9D9D9' }}
                readOnly={isReadOnly}
                name="password"
                onChange={OnChange}
              />
              <Edit onClick={() => handleEditClick()} />
              <Confirmpassword isOpen={isModalOpen} onClose={onCloseModal} theme={themeColor} />
            </div>
          </div>
          <Save onClick={handleSaveClick}>저장</Save>
        </EditUser>
      </UserInfo>
    </MainPageWrapper>
  );
};

export default MyPage;
