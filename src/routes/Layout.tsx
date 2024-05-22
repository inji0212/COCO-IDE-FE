import { useTheTheme } from '../components/Theme';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';

export const Layout = () => {
  const { themeColor } = useTheTheme();
  const location = useLocation();

  const style = {
    color: themeColor === 'light' ? '#000000' : '#ffffff',
    height: '100vh',
    overflow: 'hidden',
    minHeight: '600px', //최소 높이 설정
  };
  const showNav = location.pathname !== '/login';

  return (
    <div style={style}>
      {showNav && <Nav />}
      <Outlet />
    </div>
  );
};
