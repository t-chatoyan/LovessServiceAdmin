import {Input, Button, Select} from 'antd'
import {useState, useEffect} from 'react'

const {TextArea} = Input

interface AddSubServiceFormProps {
    onCancel: () => void
    onSubmit?: () => void
    defaultCategoryId?: string
    defaultCategoryName?: string
    defaultSubCategoryId?: string
    defaultSubCategoryName?: string
    categories?: Array<{id: string; name: {hy?: string; [key: string]: string | undefined}}>
    services?: Array<{id: string; name: {hy?: string; [key: string]: string | undefined}}>
}

const AddSubServiceForm = ({
    onCancel,
    onSubmit,
    defaultCategoryId,
    defaultSubCategoryId,
    categories = [],
    services = [],
}: AddSubServiceFormProps) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(defaultCategoryId)
    const [subCategoryId, setSubCategoryId] = useState<string | undefined>(defaultSubCategoryId)
    const [subServiceName, setSubServiceName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (categoryId !== defaultCategoryId) {
            setSubCategoryId(undefined)
        }
    }, [categoryId, defaultCategoryId])

    const handleSubmit = () => {
        // TODO: Implement subservice creation API call
        console.log('SubService data:', {
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            name: subServiceName,
            description: description,
        })
        onSubmit?.()
        onCancel()
    }

    const categoryOptions = categories.map((cat) => ({
        label: cat.name?.hy || '',
        value: cat.id,
    }))

    const subCategoryOptions = services.map((service) => ({
        label: service.name?.hy || service.name?.en || '',
        value: service.id,
    }))

    return (
        <div className="flex flex-col gap-[16px]">
            <Select
                placeholder="Կատեգորիա"
                value={categoryId}
                onChange={setCategoryId}
                options={categoryOptions}
                className="add-subservice-select"
                style={{
                    borderRadius: '10px',
                    height: '48px',
                }}
            />
            <Select
                placeholder="Ենթակատեգորիա"
                value={subCategoryId}
                onChange={setSubCategoryId}
                options={subCategoryOptions}
                className="add-subservice-select"
                disabled={!categoryId}
                style={{
                    borderRadius: '10px',
                    height: '48px',
                }}
            />
            <Input
                placeholder="Անվանում"
                value={subServiceName}
                onChange={(e) => setSubServiceName(e.target.value)}
                className="add-subservice-input"
                style={{
                    borderRadius: '10px',
                    padding: '15px',
                    border: '1px solid #ECECEC',
                    height: '48px',
                }}
            />
            <TextArea
                placeholder="Նկարագրություն"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-subservice-input"
                style={{
                    borderRadius: '10px',
                    padding: '15px',
                    border: '1px solid #ECECEC',
                    height: '142px',
                    resize: 'none',
                }}
            />
            <div className="flex justify-end">
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                        borderRadius: '6px',
                        backgroundColor: '#502E90',
                        height: '38px',
                        padding: '9px 25px',
                        border: 'none',
                    }}
                >
                    Ավելացնել
                </Button>
            </div>
        </div>
    )
}

export default AddSubServiceForm
