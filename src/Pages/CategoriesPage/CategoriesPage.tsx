import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Modal} from 'antd'
import type { AppDispatch, RootState } from '../../Redux/store'
import { getCategoriesThunk } from '../../Redux/Slices/categoriesSlice/categoriesSliceThunk'
import PageHeader from '../../Components/PageHeader'
import CategoryCard from './CategoryCard'
import AddCategoryForm from '../../Components/AddCategoryForm'
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'

const CategoriesPage = () => {
    const {categories} = useSelector((state: RootState)=> state.categories)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState<{id: string; name: string} | null>(null)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [dispatch])

    console.log(categories, 'categories-----')

  const filterOptions = [
    { label: 'Բոլորը', value: 'all' },
    { label: 'Ակտիվ', value: 'active' },
    { label: 'Անակտիվ', value: 'inactive' },
  ]

  const sortOptions = [
    { label: 'Նորեր', value: 'newest' },
    { label: 'Հիներ', value: 'oldest' },
    { label: 'Անուն', value: 'name' },
  ]

  const handleSearch = (value: string) => {
    console.log('Search:', value)
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

  const handleEdit = (categoryId: string) => {
    console.log('Edit category:', categoryId)
  }

  const handleDelete = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (category) {
      setCategoryToDelete({
        id: categoryId,
        name: category.name?.hy || '',
      })
      setIsDeleteModalOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      // TODO: Implement category deletion API call
      console.log('Deleting category:', categoryToDelete.id)
      setIsDeleteModalOpen(false)
      setCategoryToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setCategoryToDelete(null)
  }


  return (
    <div className="flex flex-col gap-[50px]">
      <PageHeader
        title="Բոլոր կատեգորիաները"
        filterOptions={filterOptions}
        searchPlaceholder="Search"
        sortOptions={sortOptions}
        sortDefaultValue="newest"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onAddClick={handleAddClick}
      />
      <div className='flex flex-wrap gap-[32px]'>
        {
          categories?.length > 0 && categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        }
      </div>

      <Modal
        open={isAddModalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        title="Նոր կատեգորիա"
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
        <AddCategoryForm onCancel={handleModalClose} />
      </Modal>

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Ջնջել կատեգորիա"
        itemName={categoryToDelete?.name || ''}
        message={`Վստահ եք, որ ուզում եք ջնջել <strong>${categoryToDelete?.name || ''}</strong> կատեգորիան։`}
        warningText="Բոլոր ենթակատեգորիաները նույնպես կջնջվեն:"
      />
    </div>
  )
}

export default CategoriesPage


