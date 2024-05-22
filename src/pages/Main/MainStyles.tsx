import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export interface SearchInputProps {
  show?: boolean;
}

export const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  borderColor: '#eef1f3', // 라이트 모드 보더 색상
  background: '#fff',
  buttonColor: '#AAEAD3',
  attendcolor: '#E1F9F0',
  HiColor: '#23BE87',
  attend: '#ffffff',
  attendbutton: '#28B381',
};

export const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  borderColor: '#54595b', // 다크 모드 보더 색상
  background: '#243B56',
  buttonColor: '#23BE87',
  attendcolor: '#23BE87',
  HiColor: '#E1F9F0',
  attend: '#23BE87',
  attendbutton: '#ffffff',
};

// 회전 애니메이션 정의
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  z-index: 0;
`;
export const Sidecontainer = styled.div`
  height: 100%;
  display: flex;
  left: 0;
  min-width: 150px;
  width: 13vw;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-right: 1px solid #d8dfe3;
`;

// "+" 부분을 스타일링하는 컴포넌트
export const Plus = styled.span`
  display: inline-block;
  transition: transform 0.3s;
`;

export const PjButton = styled.button`
  background-color: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s;
  width: 11vw;
  min-width: 120px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #76c1af; /* 호버 시 배경색 변경 */

    ${Plus} {
      animation: ${rotateAnimation} 0.3s linear forwards;
    }
  }
`;
export const FolderButton = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
  flex-direction: row;
  min-width: 150px;
  width: 13vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-top: 10px;
  &:hover {
    background-color: rgba(118, 193, 175, 0.3);
  }
`;
export const ChatButton = styled(Link)`
  color: ${({ theme }) => theme.text};
  padding: 10px;
  padding-left: 14px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  min-width: 150px;
  width: 13vw;
  flex-direction: row;
  display: flex;
  align-items: center;
  height: 40px;

  &:hover {
    background-color: rgba(118, 193, 175, 0.3);
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
export const Iconchat = styled.img`
  width: 35px;
  height: 35px;
  margin-right: -6px;
`;
export const Iconmypage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0px;
  margin-left: 7px;
`;

export const Menuname = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 600;
  display: flex;
  flex-grow: 1;
  margin-left: 10px;
`;
export const Maincontainer = styled.div`
  width: 900px;
  margin-left: 24vw;
  margin-right: 15vw;
  display: grid;
  grid-template-columns: 1fr 0.8fr; /* 왼쪽 열은 1fr, 오른쪽 열은 0.5fr */
  grid-template-rows: repeat(2, 1fr); /* 두 개의 행을 동일한 비율로 설정 */
  gap: 40px;
  padding: 0px 0px 0px 0px;
  height: 93vh;
  justify-content: center;
  align-items: center;
  transition: margin-left 0.6s ease; /* 부드러운 전환 효과 추가 */
  z-index: 0;
  position: relative;
  @media (max-width: 1250px) {
    grid-template-columns: 1fr; /* 한 열로 변경 */
    padding: 20px 20px;
    margin-left: 20vw;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; /* 스크롤바를 숨깁니다 */
    }
    /* Firefox용 스크롤바 숨김 */
    scrollbar-width: none; /* 스크롤바를 숨깁니다 */
  }
  @media (max-width: 900px) {
    margin-left: 33vw;
  }
  @media (max-width: 750px) {
    margin-left: 29vw;
  }
  @media (max-width: 600px) {
    margin-left: 25vw;
  }
  @media (max-width: 550px) {
    margin-left: 142.5px;
  }
`;
export const Hicontainer = styled.div`
  background-color: ${({ theme }) => theme.HiColor};
  height: 280px;
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 30px 30px 0px 60px;
  border-radius: 16px;
  margin: 10px;
  align-self: end;
  justify-self: left; // 그리드 셀 내 중앙 정렬
  position: relative;
  z-index: 0;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  @media (max-width: 1250px) {
    width: 66vw;
  }
  @media (max-width: 900px) {
    width: 370px;
  }
  &:hover {
    transform: scale(1.05); // 호버 시 살짝 커지도록 설정
  }
`;

export const MainImg = styled.img`
  width: 250px;
  height: 170px;
  margin-top: 10px;
  @media (max-width: 1250px) {
    margin-left: 30vw;
    margin-top: -100px;
  }
  @media (max-width: 900px) {
    margin-left: 0;
    margin-top: -10px;
  }
`;
export const Hione = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  color: black;
`;
export const Hitwo = styled.p`
  font-size: 20px;
  margin-top: 20px;
  font-style: normal;
  font-weight: 600;
  color: black;
`;

export const Attendancecontainer = styled.div`
  background-color: ${({ theme }) => theme.attendcolor};

  height: 280px;
  display: flex;
  width: 370px;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border-radius: 16px;
  margin: 10px;
  align-items: center;
  align-self: end;
  justify-self: left;
  z-index: 0;
  position: relative;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
export const AttendButton = styled.button`
  background-color: ${({ theme }) => theme.attendbutton};
  color: ${({ theme }) => theme.attend};
  width: 200px;
  height: 40px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  border-radius: 5px;
  transition: color 0.3s ease;
  margin: 20px 0 0 0;
  &:hover {
    color: #000;
  }
`;
export const Date = styled.div`
  background-color: white;
  height: 150px;
  width: 130px;
  border-radius: 50%;
  position: relative; // AttendanceImage의 부모 요소가 됨
`;
export const Month = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
export const Day = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 55px;
`;
const Stamp = keyframes`
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  95% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
export const AttendanceImage = styled.img<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  height: 140px;
  width: 140px;
  position: absolute; // 스크롤에 따라 이동하지 않도록 위치 설정
  margin-top: -200px;
  margin-left: 30px;
  z-index: 1; // Date 위에 위치하기 위해 z-index 사용
  animation: ${Stamp} 0.5s ease-out forwards;
`;

export const Pjcontainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 240px;
  width: 170px;
  margin: 10px;
  align-self: start;
  justify-self: left;
  z-index: 0;
  position: relative;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 1250px) {
    margin-left: 45vw;
    margin-top: -330px;
  }
  @media (max-width: 900px) {
    margin: 10px;
  }
`;
export const ModifyPj = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 600;
  margin-top: -20px;
  margin-left: 30px;
  font-size: 18px;
`;

export const ModifyPjBtn = styled.button`
background-color: white;
padding: 20px;
border-radius: 5px;
border: 1px solid #A9B5BC;
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
width: 140px;
height: 160px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #d8dfe3;`;

export const ModifyIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const ChatContainer = styled.div`
  flex-direction: column;
  height: 350px;
  width: 400px;
  margin: 10px;
  align-self: start;
  justify-self: left;
  z-index: 0;
  position: relative;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 1250px) {
    width: 66vw;
  }
  @media (max-width: 900px) {
    width: 380px;
  }
`;
export const Chatnav = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Chatname = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 600;
  display: flex;
  margin: 7px 0px 0 10px;
  flex-grow: 1;
  font-size: 18px;
`;
export const Chatmore = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 500;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 8px;
  &:hover {
    text-decoration: underline;
  }
`;
export const AttendCalender = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 500;
  margin-top: 20px;
  font-size: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
export const Chatmain = styled.div`
  border-top: 1px solid rgba(102, 102, 102, 0.6);
  border-bottom: 1px solid rgba(102, 102, 102, 0.6);
  height: 250px;
  width: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
  @media (max-width: 1250px) {
    width: 66vw;
  }
  @media (max-width: 900px) {
    width: 380px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px 0px 10px;
`;
export const MyUserContainer = styled(UserContainer)`
  margin: 0px 10px 20px 10px;
`;

export const UserName = styled.h1`
  font-size: 10px;
  margin-top: 0.6rem;
  white-space: nowrap;
`;

export const UserIcon = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const MessageFlexContainer = styled.div`
  display: flex;
  flex-direction: row; // 아이템을 가로로 배열
  align-items: flex-end; // 아이템을 컨테이너의 하단에 정렬
  width: 100%;
`;

export const MessageOther = styled.div`
  align-self: flex-start;
  display: flex;
  margin: 9px 0px;
  align-items: flex-end;
  width: 100%;
`;

export const MessageMine = styled(MessageOther)`
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const MessageMinetext = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid rgba(102, 102, 102, 0.6);
  background-color: #9be9a8;
  padding: 15px 20px;
  margin: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 13px;
  color: black;
  max-width: 265px;
  @media (max-width: 1250px) {
    max-width: 52vw;
  }
  @media (max-width: 1200px) {
    max-width: 51.5vw;
  }
  @media (max-width: 1150px) {
    max-width: 51vw;
  }
  @media (max-width: 1100px) {
    max-width: 50.5vw;
  }
  @media (max-width: 1050px) {
    max-width: 50vw;
  }
  @media (max-width: 1000px) {
    max-width: 49.5vw;
  }
  @media (max-width: 950px) {
    max-width: 49vw;
  }
  @media (max-width: 900px) {
    max-width: 220px;
  }
`;
export const MessageOthertext = styled(MessageMinetext)`
  background-color: #fff;
`;
export const Timestamp = styled.h1`
  font-size: 12px;
  margin-bottom: 10px;
`;
export const Timestampmine = styled.h1`
  font-size: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  white-space: nowrap;
`;
