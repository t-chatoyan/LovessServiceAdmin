import {useEffect, useState} from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Modal} from 'antd'
import type {RootState, AppDispatch} from '../../Redux/store'
import {getCategoriesThunk} from '../../Redux/Slices/categoriesSlice/categoriesSliceThunk'
import {getServicesThunk, filterServicesByCategoryThunk} from '../../Redux/Slices/serviceSlice/serviceSliceThunk'
import PageHeader from '../../Components/PageHeader'
import CategoryCard from '../CategoriesPage/CategoryCard'
import AddSubCategoryForm from '../../Components/AddSubCategoryForm'
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'

const ServicePage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const categoryId = searchParams.get('categoryId')
    const {categories} = useSelector((state: RootState) => state.categories)
    const {services} = useSelector((state: RootState) => state.services)
    const dispatch = useDispatch<AppDispatch>()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState<{id: string; name: string} | null>(null)

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategoriesThunk())
        }
    }, [dispatch, categories.length])

    useEffect(() => {
        if (categoryId) {
            dispatch(filterServicesByCategoryThunk({ categoryId }))
        } else {
            dispatch(getServicesThunk())
        }
    }, [dispatch, categoryId])

    const category = categories.find((cat) => cat.id === categoryId)
    const categoryTitle = category?.name?.hy || ''

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
        if (categoryId) {
            dispatch(filterServicesByCategoryThunk({ 
                categoryId, 
                search: value || undefined 
            }))
        } else {
            dispatch(getServicesThunk())
        }
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
        navigate('/categories')
    }

    const handleEdit = (serviceId: string) => {
        console.log('Edit service:', serviceId)
    }

    const handleDelete = (serviceId: string) => {
        const service = services.find((s) => s.id === serviceId)
        if (service) {
            setServiceToDelete({
                id: serviceId,
                name: service.name?.hy || service.name?.en || '',
            })
            setIsDeleteModalOpen(true)
        }
    }

    const handleDeleteConfirm = () => {
        if (serviceToDelete) {
            // TODO: Implement service deletion API call
            console.log('Deleting service:', serviceToDelete.id)
            setIsDeleteModalOpen(false)
            setServiceToDelete(null)
        }
    }

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false)
        setServiceToDelete(null)
    }

    return (
        <div className="flex flex-col gap-[50px]">
            <PageHeader
                title={categoryTitle}
                filterOptions={filterOptions}
                searchPlaceholder="Search"
                sortOptions={sortOptions}
                sortDefaultValue="newest"
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onAddClick={handleAddClick}
                onBack={handleBack}
            />
            <div className='flex flex-wrap gap-[32px]'>
                {
                    services?.length > 0 && services.map((service) => {
                        const params = new URLSearchParams()
                        if (categoryId) {
                            params.append('categoryId', categoryId)
                        }
                        params.append('serviceId', service.id)
                        return (
                            <CategoryCard
                                key={service.id}
                                category={service as any}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                disableNavigation={false}
                                useImageTag={true}
                                navigationPath={`/categories/service/subServices?${params.toString()}`}
                                navigationState={{ service }}
                            />
                        )
                    })
                }
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
                <AddSubCategoryForm
                    onCancel={handleModalClose}
                    defaultCategoryId={categoryId || undefined}
                    defaultCategoryName={categoryTitle}
                    categories={categories}
                />
            </Modal>

            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Ջնջել ենթակատեգորիա"
                itemName={serviceToDelete?.name || ''}
                message={`Վստահ եք, որ ուզում եք ջնջել <strong>${serviceToDelete?.name || ''}</strong> ենթակատեգորիան։`}
            />
        </div>
    )
}

export default ServicePage

