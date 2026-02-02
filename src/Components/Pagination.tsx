import { Pagination as AntPagination } from 'antd'
import type { PaginationProps } from 'antd'

interface PaginationComponentProps {
  current?: number
  total: number
  pageSize?: number
  onChange?: (page: number, pageSize: number) => void
  showSizeChanger?: boolean
  showTotal?: boolean
  disabled?: boolean
  className?: string
}

const Pagination = ({
  current = 1,
  total,
  pageSize = 10,
  onChange,
  showSizeChanger = false,
  showTotal = true,
  disabled = false,
  className = '',
}: PaginationComponentProps) => {
  const handleChange: PaginationProps['onChange'] = (page, size) => {
    if (onChange) {
      onChange(page, size)
    }
  }

  const showTotalFunc = showTotal
    ? (total: number, range: [number, number]) => {
        return `${range[0]}-${range[1]} of ${total} items`
      }
    : undefined

  return (
    <div className={`flex justify-end ${className}`}>
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handleChange}
        onShowSizeChange={handleChange}
        showSizeChanger={showSizeChanger}
        showTotal={showTotalFunc}
        disabled={disabled}
        showQuickJumper
      />
    </div>
  )
}

export default Pagination
