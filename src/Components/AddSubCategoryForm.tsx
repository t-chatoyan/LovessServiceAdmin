import {Input, Button, Upload, Image, Select} from 'antd'
import {CloseOutlined, CameraOutlined} from '@ant-design/icons'
import {useState} from 'react'
import type {UploadFile} from 'antd'

const {TextArea} = Input

interface AddSubCategoryFormProps {
    onCancel: () => void
    onSubmit?: () => void
    defaultCategoryId?: string
    defaultCategoryName?: string
    categories?: Array<{id: string; name: {hy?: string; [key: string]: string | undefined}}>
}

const AddSubCategoryForm = ({
    onCancel,
    onSubmit,
    defaultCategoryId,
    categories = [],
}: AddSubCategoryFormProps) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(defaultCategoryId)
    const [subCategoryName, setSubCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleSubmit = () => {
        // TODO: Implement subcategory creation API call
        console.log('SubCategory data:', {
            categoryId: categoryId,
            name: subCategoryName,
            description: description,
            icon: fileList[0]?.originFileObj,
        })
        onSubmit?.()
        onCancel()
    }

    const handleFileChange = (info: {fileList: UploadFile[]}) => {
        setFileList(info.fileList)
        if (info.fileList.length > 0 && info.fileList[0].originFileObj) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string)
            }
            reader.readAsDataURL(info.fileList[0].originFileObj)
        } else {
            setPreviewImage(null)
        }
    }

    const handleRemoveImage = () => {
        setFileList([])
        setPreviewImage(null)
    }

    const categoryOptions = categories.map((cat) => ({
        label: cat.name?.hy || '',
        value: cat.id,
    }))

    return (
        <div className="flex flex-col gap-[16px]">
            <Select
                placeholder="Կատեգորիա"
                value={categoryId}
                onChange={setCategoryId}
                options={categoryOptions}
                className="add-subcategory-select"
                style={{
                    borderRadius: '10px',
                    height: '48px',
                }}
            />
            <Input
                placeholder="Անվանում"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="add-subcategory-input"
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
                className="add-subcategory-input"
                style={{
                    borderRadius: '10px',
                    padding: '15px',
                    border: '1px solid #ECECEC',
                    height: '142px',
                    resize: 'none',
                }}
            />
            <div className="flex gap-[16px] items-start">
                <Upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*"
                    showUploadList={false}
                >
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            border: '2px dashed #D9D9D9',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FAFAFA',
                        }}
                    >
                        <CameraOutlined style={{ fontSize: '24px', color: '#8C8C8C' }} />
                    </div>
                </Upload>
                {previewImage && (
                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                        <Image
                            src={previewImage}
                            alt="Preview"
                            style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <button
                            onClick={handleRemoveImage}
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#FF160D',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                            }}
                        >
                            <CloseOutlined style={{ fontSize: '12px' }} />
                        </button>
                    </div>
                )}
            </div>
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

export default AddSubCategoryForm
