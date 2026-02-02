import PageHeader from '../../Components/PageHeader'

const TariffsPage = () => {
  const filterOptions = [
    { label: 'Բոլորը', value: 'all' },
    { label: 'Ակտիվ', value: 'active' },
    { label: 'Անակտիվ', value: 'inactive' },
  ]

  const sortOptions = [
    { label: 'Նորեր', value: 'newest' },
    { label: 'Հիներ', value: 'oldest' },
    { label: 'Գին', value: 'price' },
    { label: 'Անուն', value: 'name' },
  ]

  const handleSearch = (value: string) => {
    console.log('Search tariffs:', value)
  }

  const handleSortChange = (value: string) => {
    console.log('Sort tariffs:', value)
  }

  const handleAddClick = () => {
    console.log('Add tariff clicked')
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Սակագներ"
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

export default TariffsPage


