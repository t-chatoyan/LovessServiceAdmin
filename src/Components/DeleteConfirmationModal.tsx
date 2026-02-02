import {Modal, Button} from 'antd'

interface DeleteConfirmationModalProps {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
    title: string
    itemName: string
    message?: string
    warningText?: string
    confirmButtonText?: string
    cancelButtonText?: string
}

const DeleteConfirmationModal = ({
    open,
    onCancel,
    onConfirm,
    title,
    itemName,
    message,
    warningText,
    confirmButtonText = 'Ջնջել',
    cancelButtonText = 'Չեղարկել',
}: DeleteConfirmationModalProps) => {
    const defaultMessage = `Վստահ եք, որ ուզում եք ջնջել <strong>${itemName}</strong>։`
    const displayMessage = message || defaultMessage

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            centered
            title={title}
            width={500}
            footer={[
                <Button
                    key="cancel"
                    onClick={onCancel}
                    style={{
                        borderRadius: '6px',
                        height: '38px',
                        padding: '9px 25px',
                        border: '1px solid #D9D9D9',
                        color: '#595959',
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    {cancelButtonText}
                </Button>,
                <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={onConfirm}
                    style={{
                        borderRadius: '6px',
                        height: '38px',
                        padding: '9px 25px',
                        backgroundColor: '#FF160D',
                        border: 'none',
                    }}
                >
                    {confirmButtonText}
                </Button>,
            ]}
            styles={{
                title: {
                    fontSize: '18px',
                    fontWeight: 700,
                },
                body: {
                    padding: '24px',
                },
            }}
        >
            <div className="flex flex-col gap-[8px]">
                <p 
                    style={{ fontSize: '14px', color: '#595959', margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: displayMessage }}
                />
                {warningText && (
                    <p style={{ fontSize: '14px', color: '#595959', margin: 0 }}>
                        {warningText}
                    </p>
                )}
            </div>
        </Modal>
    )
}

export default DeleteConfirmationModal
