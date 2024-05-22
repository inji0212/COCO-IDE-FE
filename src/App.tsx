import './styles/App.css';
import Routers from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ThemeProvider } from './components/Theme';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const AppStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    /* cursor: pointer; */
  }
`;

export default function App() {
  return (
    <ThemeProvider>
      <AppStyles />
      <div className="App">
        <Routers />
      </div>
    </ThemeProvider>
  );
}
