import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`;

export const MainLogo = styled.div`
  width: 40%;
  display: flex;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const MainImg = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%); /* Center the image */
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width: 800px) {
    display: none;
  }
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.lightColor : 'transparent')};
`;
export const Phrases = styled.div`
  margin-top: 5%;
  font-family: 'Jura';
  font-weight: 400;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  line-height: 60px;
  letter-spacing: 6px;
`;
export const Text = styled.span`
  color: ${({ theme }) => (theme.themeColor === 'dark' ? '#ffffff' : '#000000')};
`;
export const FontColor = styled.span`
  color: #23be87;
  letter-spacing: 2px;
`;
export const Highlight = styled.span`
  color: #23be87;
`;
export const LoginBtn = styled.button`
  margin-top: 5%;
  color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : theme.lightColor)};
  border-radius: 5px;
  font-weight: 600;
  letter-spacing: 2px;
  background-color: #23be87;
  height: 50px;
  width: 140px;
`;
