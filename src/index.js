import { LocaleProvider } from 'context/LocaleContext'
import ReactDOM from 'react-dom'
import App from './components/App'
import GlobalStyles from './styles/GlobalStyles'

ReactDOM.render(
  <LocaleProvider defaultValue="ko">
    <GlobalStyles />
    <App />
  </LocaleProvider>,
  document.getElementById('root')
)
