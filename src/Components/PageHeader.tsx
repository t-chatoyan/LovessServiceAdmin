import {Select, Input} from 'antd'
import {SearchOutlined, PlusOutlined} from '@ant-design/icons'
import type {SelectProps} from 'antd'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'

const {Search} = Input

interface PageHeaderProps {
    title: string
    filterOptions?: SelectProps['options']
    filterPlaceholder?: string
    searchPlaceholder?: string
    onSearch?: (value: string) => void
    sortOptions?: SelectProps['options']
    sortDefaultValue?: string
    onSortChange?: (value: string) => void
    addButtonText?: string
    onAddClick?: () => void
    showFilter?: boolean
    showSearch?: boolean
    showSort?: boolean
    showAddButton?: boolean
    onBack?: () => void
}

const PageHeader = ({
                        title,
                        filterOptions = [],
                        filterPlaceholder = 'Ֆիլտր',
                        searchPlaceholder = 'Որոնում',
                        onSearch,
                        sortOptions = [],
                        sortDefaultValue,
                        onSortChange,
                        addButtonText = 'Ավելացնել',
                        onAddClick,
                        showFilter = true,
                        showSearch = true,
                        showSort = true,
                        showAddButton = true,
                        onBack,
                    }: PageHeaderProps) => {
    return (
        <div className="flex flex-col  gap-[20px]">
            <h1 className="text-[24px] font-[700] flex items-center gap-[12px]">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
                    >
                        <img 
                            src={arrowLeftIcon} 
                            alt="Back" 
                            className="w-[24px] h-[24px]"
                        />
                    </button>
                )}
                {title}
            </h1>
            <div className="flex items-center justify-between gap-[] flex-wrap">
                <div>
                    {showFilter && (
                        <Select
                            placeholder={filterPlaceholder}
                            options={filterOptions}
                            className="w-[100px] h-[38px] rounded-[6px]"
                            allowClear
                        />
                    )}
                </div>
                <div className="flex gap-[12px]">
                    {showSearch && (
                        <div className="page-header-search-wrapper">
                            <Search
                                placeholder={searchPlaceholder}
                                onSearch={onSearch}
                                onChange={(e) => onSearch?.(e.target.value)}
                                className="w-[220px] h-[38px]"
                                prefix={<SearchOutlined className="text-gray-400"/>}
                            />
                        </div>
                    )}
                    {showSort && (
                        <Select
                            placeholder="Դասակարգել ըստ"
                            options={sortOptions}
                            defaultValue={sortDefaultValue}
                            onChange={onSortChange}
                            className="w-[220px] h-[38px] rounded-[6px]"
                        />
                    )}
                    {showAddButton && (
                        <button
                            onClick={onAddClick}
                            className="px-[16px] py-[8px] rounded-[6px] font-bold text-[12px] bg-[#502E90] text-white flex items-center justify-center gap-[8px] hover:opacity-90 transition-opacity cursor-pointer border-none"
                            
                        >
                            <PlusOutlined />
                            {addButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PageHeader

