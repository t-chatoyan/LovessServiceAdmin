import searchIcon from '../assets/icons/search.svg'
import notificationsIcon from '../assets/icons/notifications.svg'
import { Dropdown, type MenuProps } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { clearAuthenticated } from '../auth/demoAuth'

const TopBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuthenticated()
    localStorage.removeItem('token')
    navigate('/signin', { replace: true })
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-[7px]">
          <LogoutOutlined />
          <span>Դուրս գալ</span>
        </div>
      ),
      onClick: handleLogout,
    },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-[80px] items-center justify-end px-6">
      <div className="flex items-center gap-[40px]">
        <button
          type="button"
          className="bg-transparent border-none inline-flex h-9 w-9 items-center justify-center"
          aria-label="Search"
        >
          <img src={searchIcon} alt="" className="h-[22px] w-[22px]" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="bg-transparent border-none inline-flex h-9 w-9 border-none items-center justify-center"
          aria-label="Notifications"
        >
          <img src={notificationsIcon} alt="" className="h-[22px] w-[22px]" aria-hidden="true" />
        </button>

        <Dropdown
          menu={{ items: menuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="inline-flex h-9 w-9 items-center justify-center p-[10px] rounded-full bg-[#e2dbef] text-sm font-semibold text-[#502E90] cursor-pointer">
            <span className="w-[20px] h-[20px] flex justify-center items-center">
               AD
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

export default TopBar