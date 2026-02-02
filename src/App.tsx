import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppProviders from './AppProviders'
import AppRouter from './AppRouter'

const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
