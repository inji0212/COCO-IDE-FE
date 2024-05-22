import FirstImg from '../../assets/FistMainIMg.png';
import { ReactComponent as DarkLogo } from '../../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../../assets/logo-dark.svg';
import { FontColor, Highlight, LoginBtn, MainImg, MainLogo, MainWrapper, Phrases, Text } from './FirstMainStyles';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';

const FirstMain = () => {
  const { themeColor } = useTheTheme();
  return (
    <MainWrapper>
      <MainLogo>
        <Phrases>
          <div className="flex justify-center mb-8">{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</div>
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
        </Phrases>
        <Link to="/login" className="mt-8">
          <LoginBtn>로그인</LoginBtn>
        </Link>
      </MainLogo>
      <MainImg>
        <img src={FirstImg} alt="FirstMainImg" />
      </MainImg>
    </MainWrapper>
  );
};

export default FirstMain;
