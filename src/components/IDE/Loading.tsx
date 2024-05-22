import Spinner from '../../assets/Spinner@1x-1.0s-200px-200px.gif';
import { Background, LoadingText } from './IdeStyle';

export const Loading = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="6%" />
    </Background>
  );
};
