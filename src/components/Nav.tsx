import { ReactComponent as DarkLogo } from '../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../assets/logo-dark.svg';
import { ReactComponent as UserIcon } from '../assets/userIcon.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useTheTheme } from '../components/Theme';
import styled from 'styled-components';
import useAuthStore from '../state/AuthStore';

const Container = styled.nav`
  height: 64px; // 16px * 4
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme }) => {
      const isMainPage = location.pathname === '/';
      const isSignupPage = location.pathname === '/signup';
      return isMainPage || isSignupPage ? 'none' : theme.borderColor;
    }};
`;

const Half = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
  padding: 10px 40px;
`;
const Half2 = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  height: 100%;
  padding: 10px 40px;
  background-color: ${({ theme }) => {
    const isMainPage = location.pathname === '/';
    return isMainPage && theme.themeColor === 'dark' ? theme.lightColor : 'transparent';
  }};
  @media (max-width: 800px) {
    background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : 'transparent')};
  }
`;

const MenuContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : theme.lightColor)};
  display: flex;
  z-index: 5;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  text-align: center;
  position: absolute;
  top: 4rem;
  right: 0.25rem;
  p {
    &:hover {
      cursor: pointer;
    }
  }
  z-index: 100;
`;

export default function Header() {
  const navigate = useNavigate();
  const { themeColor, toggleTheme } = useTheTheme();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { clearAuthInfo, memberId } = useAuthStore(state => ({
    clearAuthInfo: state.clearAuthInfo,
    memberId: state.memberId,
  }));
  const showIcons = location.pathname !== '/' && location.pathname !== '/signup';
  const isSpecialPage =
    location.pathname === `/chat/${memberId}` ||
    location.pathname === `/ide//${memberId}` ||
    location.pathname === `/main/${memberId}` ||
    location.pathname === `/mypage/${memberId}`;

  const Logout = () => {
    clearAuthInfo();
    alert('로그아웃되었습니다.');
    setMenu(false);
    navigate('/');
  };

  const isLoggedIn = memberId !== '';
  const OnClick = () => {
    setMenu(false);
  };

  return (
    <Container>
      <Half>
        <Link to={isLoggedIn ? `/main/${memberId}` : '/'}>{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</Link>
      </Half>
      <Half2>
        <span style={{ marginLeft: 'auto' }}>
          {location.pathname !== '/signup' && (
            <IconButton onClick={toggleTheme}>
              {themeColor === 'light' ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon style={{ color: isSpecialPage ? 'white' : 'inherit' }} />
              )}
            </IconButton>
          )}
          <>
            {showIcons && (
              <IconButton
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <UserIcon />
              </IconButton>
            )}
            {menu === true ? (
              <MenuContainer>
                <p onClick={Logout}>Logout</p>
                <hr></hr>
                <Link to={`/mypage/${memberId}`} onClick={OnClick}>
                  My Page
                </Link>
              </MenuContainer>
            ) : null}
          </>
        </span>
      </Half2>
    </Container>
  );
}
