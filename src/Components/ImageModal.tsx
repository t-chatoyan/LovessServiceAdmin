import {Modal} from 'antd'
import {useState} from 'react'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'

interface ImageModalProps {
    imageUrl: string
    alt?: string
    children: React.ReactNode
    images?: Array<{url: string; alt?: string}>
    currentIndex?: number
}

const ImageModal = ({imageUrl, alt = 'Image', children, images, currentIndex = 0}: ImageModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(currentIndex)

    const imageList = images && images.length > 0 
        ? images 
        : [{url: imageUrl, alt}]
    
    const currentImage = imageList[activeIndex] || imageList[0]

    const handleOpen = () => {
        setActiveIndex(currentIndex)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
    }

    const showNavigation = imageList.length > 1

    return (
        <>
            <div onClick={handleOpen} className="cursor-pointer">
                {children}
            </div>
            <Modal
                open={isOpen}
                onCancel={handleClose}
                footer={null}
                centered
                width="auto"
                styles={{
                    body: {
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    },
                }}
            >
                <div className="relative flex items-center justify-center w-full">
                    {showNavigation && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            aria-label="Previous image"
                        >
                            <img src={arrowLeftIcon} alt="Previous" className="w-6 h-6" />
                        </button>
                    )}
                    <img
                        src={currentImage.url}
                        alt={currentImage.alt || alt}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {showNavigation && (
                        <button
                            onClick={handleNext}
                            className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            aria-label="Next image"
                        >
                            <img src={arrowLeftIcon} alt="Next" className="w-6 h-6 rotate-180" />
                        </button>
                    )}
                    {showNavigation && (
                        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black bg-opacity-50 rounded text-white text-sm font-medium">
                            {activeIndex + 1}/{imageList.length}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default ImageModal
