
import { ConfigProvider, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/lovess.png'
import categoriesIcon from '../assets/icons/categories.svg'
import userIcon from '../assets/icons/user.svg'
import ordersIcon from '../assets/icons/orders.svg'
import tariffsIcon from '../assets/icons/tariffs.svg'
import confirmSpecialistIcon from '../assets/icons/confirmSpecialist.svg'

type NavItem = {
  key: string
  label: string
  path?: string
  iconSrc?: string
  iconComponent?: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { key: 'categories', label: 'Կատեգորիաներ', path: '/categories', iconSrc: categoriesIcon },
  { key: 'users', label: 'Օգտատերեր', path: '/users', iconSrc: userIcon },
  { key: 'orders', label: 'Պատվերներ', path: '/orders', iconSrc: ordersIcon },
  { key: 'notifications', label: 'Ծանուցումներ', path: '/notifications', iconComponent: <BellOutlined /> },
  { key: 'tariffs', label: 'Սակագներ', path: '/tariffs', iconSrc: tariffsIcon },
  {
    key: 'specialistApproval',
    label: 'Մասնագետի հաստատում',
    path: '/specialist-approval',
    iconSrc: confirmSpecialistIcon,
  },
]

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey =
    NAV_ITEMS.find((i) => i.path && location.pathname.startsWith(i.path))?.key ?? ''

  const items: MenuProps['items'] = NAV_ITEMS.map((i) => ({
    key: i.key,
    label: i.label,
    icon: i.iconComponent
      ? i.iconComponent
      : i.iconSrc ? (
          <img
            src={i.iconSrc}
            alt=""
            className="h-[16px] w-[16px] object-contain"
            aria-hidden="true"
          />
        ) : undefined,
  }))

  const onClick: MenuProps['onClick'] = ({ key }) => {
    const item = NAV_ITEMS.find((i) => i.key === key)
    if (item?.path) navigate(item.path)
  }

  return (
    <div className="h-screen w-[306px] shrink-0 bg-white px-[28px] py-[20px]">
      <div className="flex items-center">
        <img src={logo} alt="Lovess" className="h-[79px] w-[115px] object-contain" />
      </div>

      <div className="pt-6">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: '#502E90',
                itemSelectedColor: '#FFFFFF',
                itemHoverBg: '#F2EEFB',
                itemHoverColor: '#502E90',
                itemActiveBg: '#502E90',
              },
            },
          }}
        >
          <Menu
            className="lovess-sidebar-menu text-[14px]"
            mode="inline"
            items={items}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={onClick}
            style={{
              borderInlineEnd: 0,
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default SideBar
