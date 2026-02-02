import type { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#FF61F6',
    colorInfo: '#FF61F6',
    colorBorder: '#E2E8F0',
    borderRadius: 10,
    borderRadiusSM: 10,
    borderRadiusLG: 10,
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
  },
  components: {
    Input: {
      hoverBorderColor: '#E2E8F0',
      activeBorderColor: '#E2E8F0',
    },
    Button: {
      colorPrimary: '#502E90',
      colorPrimaryHover: '#5E3AA6',
      colorPrimaryActive: '#3F2473',
    },
    Switch: {
      colorPrimary: '#502E90',
      colorPrimaryHover: '#5E3AA6',
    },
    Pagination: {
      itemActiveBg: '#502E90',
      itemActiveColorDisabled: '#FFFFFF',
      itemBg: '#FFFFFF',
      itemInputBg: '#FFFFFF',
      itemLinkBg: '#FFFFFF',
      itemSize: 32,
      itemSizeSM: 24,
      itemActiveBgDisabled: '#502E90',
    },
  },
}


