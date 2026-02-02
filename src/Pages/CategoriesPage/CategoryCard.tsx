import { Dropdown, type MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import squarePenIcon from '../../assets/icons/square-pen.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'
import {apiUrl} from "../../Redux/Config/axiosConfig.ts";
interface Category {
  id: string
  name: {
    hy?: string
    [key: string]: string | undefined
  }
  icon?: string
  [key: string]: unknown
}

interface CategoryCardProps {
  category: Category
  onEdit: (categoryId: string) => void
  onDelete: (categoryId: string) => void
  disableNavigation?: boolean
  useImageTag?: boolean
  navigationPath?: string
  navigationState?: unknown
}

const CategoryCard = ({ category, onEdit, onDelete, disableNavigation = false, useImageTag = false, navigationPath, navigationState }: CategoryCardProps) => {
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_URL || apiUrl
  const imageUrl = category.icon ? `${baseURL}/${category.icon}` : ''

  const getMenuItems = (categoryId: string): MenuProps['items'] => [
    {
      key: 'edit',
      label: (
        <div className="flex items-center gap-[7px]">
          <img src={squarePenIcon} alt="" className="w-[16px] h-[16px]" />
          <span>Փոփոխել</span>
        </div>
      ),
      onClick: (e) => {
        e.domEvent.stopPropagation()
        onEdit(categoryId)
      },
    },
    {
      key: 'delete',
      label: (
        <div className="flex items-center gap-[7px]">
          <img src={trashboxIcon} alt="" className="w-[16px] h-[16px]" />
          <span className="text-[#FF160D]">Ջնջել</span>
        </div>
      ),
      onClick: (e) => {
        e.domEvent.stopPropagation()
        onDelete(categoryId)
      },
    },
  ]

  const handleCardClick = () => {
    if (!disableNavigation && category.id) {
      if (navigationPath) {
        navigate(navigationPath, { state: navigationState })
      } else {
        navigate(`/categories/service?categoryId=${encodeURIComponent(category.id)}`)
      }
    }
  }

  return (
    <div 
      className={`flex flex-col gap-[12px] items-center w-[210px] h-[246px] relative ${!disableNavigation ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div 
        className={`w-[100%] h-[210px] border-[3px] border-[#D9D9D9] rounded-[24px] relative flex items-center justify-center bg-white ${
          !useImageTag && imageUrl ? 'bg-cover bg-center bg-no-repeat' : ''
        }`}
        style={{
          backgroundImage: !useImageTag && imageUrl ? `url(${imageUrl})` : undefined
        }}
      >
        {useImageTag && imageUrl && (
          <img 
            src={imageUrl} 
            alt={category.name.hy || ''} 
            className="w-[136px] h-[136px] object-contain"
          />
        )}
        <Dropdown
          menu={{ items: getMenuItems(category.id) }}
          trigger={['click']}
          placement="bottomRight"
          classNames={{ root: "category-dropdown-menu" }}
        >
          <button
            className="absolute top-[12px] right-[12px] w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreOutlined className="text-gray-600 text-[24px]" />
          </button>
        </Dropdown>
      </div>
      <span className='w-[100%] flex justify-center text-center font-[16px] font-[700]'>
        {category.name.hy}
      </span>
    </div>
  )
}

export default CategoryCard

