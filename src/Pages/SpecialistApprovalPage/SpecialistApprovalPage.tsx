import PageHeader from '../../Components/PageHeader'

const SpecialistApprovalPage = () => {
  const filterOptions = [
    { label: 'Բոլորը', value: 'all' },
    { label: 'Սպասման մեջ', value: 'pending' },
    { label: 'Հաստատված', value: 'approved' },
    { label: 'Մերժված', value: 'rejected' },
  ]

  const sortOptions = [
    { label: 'Նորեր', value: 'newest' },
    { label: 'Հիներ', value: 'oldest' },
    { label: 'Անուն', value: 'name' },
    { label: 'Ամսաթիվ', value: 'date' },
  ]

  const handleSearch = (value: string) => {
    console.log('Search specialists:', value)
  }

  const handleSortChange = (value: string) => {
    console.log('Sort specialists:', value)
  }

  const handleAddClick = () => {
    console.log('Add specialist clicked')
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Մասնագետի հաստատում"
        filterOptions={filterOptions}
        searchPlaceholder="Search"
        sortOptions={sortOptions}
        sortDefaultValue="newest"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onAddClick={handleAddClick}
      />
    </div>
  )
}

export default SpecialistApprovalPage


