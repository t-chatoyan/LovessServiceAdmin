import PageHeader from '../../Components/PageHeader'
import { Pagination, Dropdown, Tooltip, type MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRequestsThunk } from '../../Redux/Slices/ordersSlice/ordersSliceThunk'
import type { AppDispatch, RootState } from '../../Redux/store'
import eyeIcon from '../../assets/icons/eye.svg'
import uploadIcon from '../../assets/icons/upload.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'

const OrdersPage = () => {
  const { requests, loading, error, pagination } = useSelector(
    (state: RootState) => state.orders
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  useEffect(() => {
    dispatch(getAllRequestsThunk({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  console.log(requests, loading, error, pagination, 'requests data')
  const filterOptions = [
    { label: 'Բոլորը', value: 'all' },
    { label: 'Նոր', value: 'new' },
    { label: 'Ընթացքի մեջ', value: 'in_progress' },
    { label: 'Ավարտված', value: 'completed' },
    { label: 'Չեղարկված', value: 'cancelled' },
  ]

  const sortOptions = [
    { label: 'Նորեր', value: 'newest' },
    { label: 'Հիներ', value: 'oldest' },
    { label: 'Գին', value: 'price' },
    { label: 'Ամսաթիվ', value: 'date' },
  ]

  const handleSearch = (value: string) => {
    console.log('Search orders:', value)
  }

  const handleSortChange = (value: string) => {
    console.log('Sort orders:', value)
  }

  const handleAddClick = () => {
    console.log('Add order clicked')
  }

  const handleView = (requestId: string) => {
    const request = requests.find((r) => r._id === requestId)
    navigate(`/orders/${requestId}`, { state: { request } })
  }

  const handleRowClick = (requestId: string) => {
    const request = requests.find((r) => r._id === requestId)
    navigate(`/orders/${requestId}`, { state: { request } })
  }

  const handleEdit = (requestId: string) => {
    console.log('Edit request:', requestId)
  }

  const handleDelete = (requestId: string) => {
    console.log('Delete request:', requestId)
  }

  const getMenuItems = (requestId: string): MenuProps['items'] => [
    {
      key: 'view',
      label: (
        <div className="flex items-center gap-[7px]">
          <img src={eyeIcon} alt="" className="w-[16px] h-[16px]" />
          <span>Դիտել</span>
        </div>
      ),
      onClick: () => {
        handleView(requestId)
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
        handleEdit(requestId)
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
        handleDelete(requestId)
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
        title="Պատվերներ"
        filterOptions={filterOptions}
        searchPlaceholder="Search"
        sortOptions={sortOptions}
        sortDefaultValue="newest"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onAddClick={handleAddClick}
      />

      <div className="bg-white rounded-lg overflow-auto max-h-[calc(100vh-400px)]">
        <table className="w-full orders-table">
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
                Պատվիրատու
              </th>
              <th
                className="w-[120px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Ամսաթիվ
              </th>
              <th
                className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Կատեգորիա
              </th>
              <th
                className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Ենթակատեգորիա
              </th>
              <th
                className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Մասնագետ
              </th>
              <th
                className="w-[160px] p-[16px] text-left text-sm font-semibold text-gray-700"
              >
                Հեռախոսահամար
              </th>
              <th
                className="w-[30px] p-[16px] rounded-tr-[6px] text-right text-sm font-semibold text-gray-700"
              ></th>
            </tr>
          </thead>
          <tbody>
            {requests?.length > 0 ? (
              requests.map((request, index) => {
                const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'

                return (
                  <tr
                    key={request._id || index}
                    className="transition-colors cursor-pointer orders-table-row h-[64px]"
                    style={{ backgroundColor }}
                    onClick={() => handleRowClick(request._id)}
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
                      <span className="text-sm   cursor-pointer">
                        {request.customer?.name || request.fullName || 'N/A'}
                      </span>
                    </td>
                    <td className="w-[120px] p-[16px] text-sm text-gray-600">
                      <Tooltip
                        title={formatTime(request.createdAt)}
                        placement="top"
                        color="#ffffff"
                        styles={{
                          container: {
                            color: '#C4C4C4',
                          },
                        }}
                      >
                        <span className="cursor-default">{formatDate(request.createdAt)}</span>
                      </Tooltip>
                    </td>
                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                      {request.service?.name
                        ? typeof request.service.name === 'string'
                          ? request.service.name
                          : request.service.name.hy || request.service.name.en || request.service.name.ru || 'N/A'
                        : 'N/A'}
                    </td>
                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                      {request.problems && request.problems.length > 0
                        ? typeof request.problems[0].title === 'string'
                          ? request.problems[0].title
                          : request.problems[0].title.hy || request.problems[0].title.en || request.problems[0].title.ru || 'N/A'
                        : 'N/A'}
                    </td>
                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                      {request.professionals && request.professionals.length > 0 && request.professionals[0].professional?.fullName
                        ? (() => {
                            const firstName = request.professionals[0].professional.fullName
                            const remainingCount = request.professionals.length - 1
                            return remainingCount > 0 ? `${firstName} (+${remainingCount})` : firstName
                          })()
                        : 'N/A'}
                    </td>
                    <td className="w-[160px] p-[16px] text-sm text-gray-600">
                      {request.customer?.countryCode && request.customer?.phoneNumber
                        ? `${request.customer.countryCode}${request.customer.phoneNumber}`
                        : request.professionals && request.professionals.length > 0 && request.professionals[0].professional?.countryCode && request.professionals[0].professional?.phoneNumber
                        ? `${request.professionals[0].professional.countryCode}${request.professionals[0].professional.phoneNumber}`
                        : 'N/A'}
                    </td>
                    <td
                      className="w-[30px] p-[16px] flex items-center justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        menu={{ items: getMenuItems(request._id) }}
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
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  <div>
                    {loading ? 'Բեռնվում է...' : 'Պատվերներ չկան'}
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

export default OrdersPage


