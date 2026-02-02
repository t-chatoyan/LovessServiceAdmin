import {useEffect, useState} from 'react'
import {useSearchParams, useNavigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Dropdown, Modal, type MenuProps} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import type {RootState, AppDispatch} from '../../Redux/store'
import {getCategoriesThunk} from '../../Redux/Slices/categoriesSlice/categoriesSliceThunk'
import {getServiceByIdThunk, getServicesThunk, filterServicesByCategoryThunk} from '../../Redux/Slices/serviceSlice/serviceSliceThunk'
import PageHeader from '../../Components/PageHeader'
import AddSubServiceForm from '../../Components/AddSubServiceForm'
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'
import squarePenIcon from '../../assets/icons/square-pen.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'

interface Service {
  id: string
  name: {
    hy?: string
    en?: string
    [key: string]: string | undefined
  }
  subServices?: Service[]
  subservices?: Service[]
  children?: Service[]
  [key: string]: unknown
}

interface LocationState {
  service?: Service
}

const SubServicePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const categoryId = searchParams.get('categoryId')
    const serviceId = searchParams.get('serviceId')
    const {categories} = useSelector((state: RootState) => state.categories)
    const {selectedService, services} = useSelector((state: RootState) => state.services)
    const dispatch = useDispatch<AppDispatch>()

    const [serviceData, setServiceData] = useState<Service | null>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [subServiceToDelete, setSubServiceToDelete] = useState<{id: string; name: string} | null>(null)

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategoriesThunk())
        }
    }, [dispatch, categories.length])

    useEffect(() => {
        if (categoryId && services.length === 0) {
            dispatch(filterServicesByCategoryThunk({ categoryId }))
        } else if (!categoryId && services.length === 0) {
            dispatch(getServicesThunk())
        }
    }, [dispatch, categoryId, services.length])

    useEffect(() => {
        const serviceFromState = (location.state as LocationState | null)?.service
        
        if (serviceFromState) {
            setServiceData((prev) => {
                if (prev?.id !== serviceFromState.id) {
                    return serviceFromState
                }
                return prev
            })
        } else if (serviceId && !serviceFromState) {
            dispatch(getServiceByIdThunk(serviceId))
        }
    }, [dispatch, serviceId, location.state])

    const currentService = serviceData || selectedService

    const category = categories.find((cat) => cat.id === categoryId)
    const categoryTitle = category?.name?.hy || ''
    const serviceTitle = currentService?.name?.hy || ''

    const subServices: Service[] = (currentService?.subServices ||
        currentService?.subservices ||
        currentService?.children ||
        []) as Service[]

    const filterOptions = [
        {label: 'Բոլորը', value: 'all'},
        {label: 'Ակտիվ', value: 'active'},
        {label: 'Անակտիվ', value: 'inactive'},
    ]

    const sortOptions = [
        {label: 'Նորեր', value: 'newest'},
        {label: 'Հիներ', value: 'oldest'},
        {label: 'Անուն', value: 'name'},
    ]

    const handleSearch = (value: string) => {
        console.log('Search subservices:', value)
        // TODO: Implement subservices search
    }

    const handleSortChange = (value: string) => {
        console.log('Sort:', value)
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true)
    }

    const handleModalClose = () => {
        setIsAddModalOpen(false)
    }

    const handleBack = () => {
        const params = new URLSearchParams()
        if (categoryId) {
            params.append('categoryId', categoryId)
        }
        navigate(`/categories/service?${params.toString()}`)
    }

    const handleEdit = (subServiceId: string) => {
        console.log('Edit subservice:', subServiceId)
    }

    const handleDelete = (subServiceId: string) => {
        const subService = subServices.find((s) => s.id === subServiceId)
        if (subService) {
            setSubServiceToDelete({
                id: subServiceId,
                name: subService.name?.hy || subService.name?.en || '',
            })
            setIsDeleteModalOpen(true)
        }
    }

    const handleDeleteConfirm = () => {
        if (subServiceToDelete) {
            // TODO: Implement subservice deletion API call
            console.log('Deleting subservice:', subServiceToDelete.id)
            setIsDeleteModalOpen(false)
            setSubServiceToDelete(null)
        }
    }

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false)
        setSubServiceToDelete(null)
    }

    const getMenuItems = (subServiceId: string): MenuProps['items'] => [
        {
            key: 'edit',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={squarePenIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Փոփոխել</span>
                </div>
            ),
            onClick: () => {
                handleEdit(subServiceId)
            },
        },
        {
            key: 'delete',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={trashboxIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span className="text-[#FF160D]">Ջնջել</span>
                </div>
            ),
            onClick: () => {
                handleDelete(subServiceId)
            },
        },
    ]

    return (
        <div className="flex flex-col gap-[50px]">
            <PageHeader
                title={serviceTitle || categoryTitle}
                filterOptions={filterOptions}
                searchPlaceholder="Search"
                sortOptions={sortOptions}
                sortDefaultValue="newest"
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onAddClick={handleAddClick}
                onBack={handleBack}
            />
            <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#ffffff]">
                    <tr>
                        <th className="w-[100px] p-[16px] rounded-tl-[6px] text-left text-sm font-semibold text-gray-700">ID
                        </th>
                        <th className="w-[270px] p-[16px] text-left text-sm font-semibold text-gray-700">Անվանում
                        </th>
                        <th className="w-[270px] p-[16px] text-left text-sm font-semibold text-gray-700">Կատեգորիա
                        </th>
                        <th className="w-[270px] p-[16px] text-left text-sm font-semibold text-gray-700">Ենթակատեգորիա
                        </th>
                        <th className="w-[100px] p-[16px] rounded-tr-[6px] text-right text-sm font-semibold text-gray-700"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        subServices?.length > 0 ? (
                            subServices.map((subService: Service, index: number) => {
                                const categoryName = category?.name?.hy || category?.name?.en || 'N/A'
                                const subCategoryName = currentService?.name?.hy || currentService?.name?.en || 'N/A'

                                const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'

                                return (
                                    <tr
                                        key={subService.id || index}
                                        className="transition-colors"
                                        style={{backgroundColor}}
                                    >
                                        <td className="w-[100px] p-[16px]">
                                            <input type="checkbox" className="cursor-pointer w-[18px] h-[18px]"/>
                                        </td>
                                        <td className="w-[270px] p-[16px]">
                                                <span
                                                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                                                    onClick={() => {
                                                        console.log('Subservice clicked:', subService.id)
                                                    }}
                                                >
                                                    {subService.name?.hy || subService.name?.en || 'N/A'}
                                                </span>
                                        </td>
                                        <td className="w-[270px] p-[16px] text-sm text-gray-600">
                                            {categoryName}
                                        </td>
                                        <td className="w-[270px] p-[16px] text-sm text-gray-600">
                                            {subCategoryName}
                                        </td>
                                        <td className="w-[100px] p-[16px] flex items-center justify-end">
                                            <Dropdown
                                                menu={{items: getMenuItems(subService.id)}}
                                                trigger={['click']}
                                                placement="bottomRight"
                                            >
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreOutlined className="text-gray-600 text-[24px]"/>
                                                </button>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    <div>
                                        No subservices available
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col justify-end items-end gap-[16px]">
                <div className="text-sm text-gray-700 font-[700]">
                    Ընդհանուր ({subServices?.length || 0})
                </div>
            </div>

            <Modal
                open={isAddModalOpen}
                onCancel={handleModalClose}
                footer={null}
                centered
                title="Նոր ենթակատեգորիա"
                width={838}
                styles={{
                    body: {
                        padding: 0,
                    },
                    title: {
                        fontSize: '18px',
                        fontWeight: 700,
                        marginBottom: '40px',
                    },
                }}
            >
                <AddSubServiceForm
                    onCancel={handleModalClose}
                    defaultCategoryId={categoryId || undefined}
                    defaultCategoryName={categoryTitle}
                    defaultSubCategoryId={serviceId || undefined}
                    defaultSubCategoryName={serviceTitle}
                    categories={categories}
                    services={services}
                />
            </Modal>

            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Ջնջել ենթակատեգորիա"
                itemName={subServiceToDelete?.name || ''}
                message={`Վստահ եք, որ ուզում եք ջնջել <strong>${subServiceToDelete?.name || ''}</strong> ենթակատեգորիան։`}
            />
        </div>
    )
}

export default SubServicePage

