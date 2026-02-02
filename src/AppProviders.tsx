import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { antdTheme } from './theme/antdTheme'
import store from './Redux/store'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </Provider>
  )
}

export default AppProviders


