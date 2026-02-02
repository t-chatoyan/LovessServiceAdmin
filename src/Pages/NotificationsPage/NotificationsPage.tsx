import PageHeader from '../../Components/PageHeader'
import { Pagination, Dropdown, Tooltip, type MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotificationsThunk } from '../../Redux/Slices/notificationsSlice/notificationsSliceThunk'
import type { AppDispatch, RootState } from '../../Redux/store'
import eyeIcon from '../../assets/icons/eye.svg'
import uploadIcon from '../../assets/icons/upload.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'

const NotificationsPage = () => {
  const { notifications, loading, pagination } = useSelector(
    (state: RootState) => state.notifications
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    dispatch(getNotificationsThunk({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  console.log('Notifications:', notifications)
  console.log('Pagination:', pagination)
  const filterOptions = [
    { label: 'Բոլորը', value: 'all' },
    { label: 'Նոր', value: 'new' },
    { label: 'Կարդացված', value: 'read' },
    { label: 'Չկարդացված', value: 'unread' },
  ]

  const sortOptions = [
    { label: 'Նորեր', value: 'newest' },
    { label: 'Հիներ', value: 'oldest' },
    { label: 'Ամսաթիվ', value: 'date' },
  ]

  const handleSearch = (value: string) => {
    console.log('Search notifications:', value)
  }

  const handleSortChange = (value: string) => {
    console.log('Sort notifications:', value)
  }

  const handleAddClick = () => {
    console.log('Add notification clicked')
  }

  const handleView = (notificationId: string) => {
    console.log('View notification:', notificationId)
  }

  const handleRowClick = (notificationId: string) => {
    const notification = notifications.find((n) => n._id === notificationId)
    navigate(`/notifications/${notificationId}`, { state: { notification } })
  }

  const handleEdit = (notificationId: string) => {
    console.log('Edit notification:', notificationId)
  }

  const handleDelete = (notificationId: string) => {
    console.log('Delete notification:', notificationId)
  }

  const getMenuItems = (notificationId: string): MenuProps['items'] => [
    {
      key: 'view',
      label: (
        <div className="flex items-center gap-[7px]">
          <img src={eyeIcon} alt="" className="w-[16px] h-[16px]" />
          <span>Դիտել</span>
        </div>
      ),
      onClick: () => {
        handleView(notificationId)
      },
    },
    {
      key: 'edit',
      label: (
        <div className="flex items-center gap-[7px]">
          <img src={uploadIcon} alt="" className="w-[16px] h-[16px]" />
          <span>Խմբագրել</span>
        </div>
      ),
      onClick: () => {
        handleEdit(notificationId)
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
      onClick: () => {
        handleDelete(notificationId)
      },
    },
  ]

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const formatTime = (dateString: string): string => {
    if (!dateString) return 'Տեղեկություն չկա'
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className="flex flex-col gap-[50px]">
      <PageHeader
        title="Ծանուցումներ"
        filterOptions={filterOptions}
        searchPlaceholder="Որոնում"
        sortOptions={sortOptions}
        sortDefaultValue="newest"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onAddClick={handleAddClick}
      />

      <div className="bg-white rounded-lg overflow-auto max-h-[calc(100vh-400px)]">
        <table className="w-full notifications-table">
          <thead className="bg-[#ffffff]">
            <tr>
              <th
                className="w-[30px] p-[16px] rounded-tl-[6px] text-left text-sm font-semibold text-gray-700"
              >
                ID
              </th>
              <th
                className="w-[200px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Օգտատեր
              </th>
              <th
                className="w-[120px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Ամսաթիվ
              </th>
              <th
                className="w-[250px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Նկարագրություն
              </th>
              <th
                className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Տեսակ
              </th>
              <th
                className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Ստատուս
              </th>
              <th
                className="w-[30px] p-[16px] rounded-tr-[6px] text-right text-sm font-semibold text-gray-700"
              ></th>
            </tr>
          </thead>
          <tbody>
            {notifications?.length > 0 ? (
              notifications.map((notification, index) => {
                const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'

                return (
                  <tr
                    key={notification._id || index}
                    className="transition-colors cursor-pointer notifications-table-row h-[64px]"
                    style={{ backgroundColor }}
                    onClick={() => handleRowClick(notification._id)}
                  >
                    <td
                      className="w-[30px] p-[16px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="cursor-pointer w-[18px] h-[18px]"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="w-[200px] p-[16px]">
                      <span className="text-sm cursor-pointer">
                        {notification.user?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="w-[120px] p-[16px] text-sm text-gray-600">
                      <Tooltip
                        title={formatTime(notification.createdAt || '')}
                        placement="top"
                        color="#ffffff"
                        styles={{
                          container: {
                            color: '#C4C4C4',
                          },
                        }}
                      >
                        <span className="cursor-default">{formatDate(notification.createdAt || '')}</span>
                      </Tooltip>
                    </td>
                    <td className="w-[250px] p-[16px] text-sm text-gray-600">
                      {notification.body || 'N/A'}
                    </td>
                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                      {notification.type === 'new_request' 
                        ? 'Հայտ'
                        : notification.type === 'request_application' 
                        ? 'Պատասխան' 
                        : notification.type || 'N/A'}
                    </td>
                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                      <span className={notification.isRead ? 'text-green-600' : 'text-orange-600'}>
                        {notification.isRead ? 'Կարդացած' : 'Չկարդացված'}
                      </span>
                    </td>
                    <td
                      className="w-[30px] p-[16px] flex items-center justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        menu={{ items: getMenuItems(notification._id) }}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreOutlined className="text-gray-600 text-[24px]" />
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  <div>
                    {loading ? 'Բեռնվում է...' : 'Ծանուցումներ չկան'}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-end items-end gap-[16px]">
        <div className="text-sm text-gray-700 font-[700]">
          Ընդհանուր ({pagination?.total || 0})
        </div>
        {pagination && (
          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.limit}
            onChange={handlePageChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
