import {useEffect, useState, useRef} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Tooltip} from 'antd'
import PageHeader from '../../Components/PageHeader'
import ImageModal from '../../Components/ImageModal'
import type {AppDispatch, RootState} from '../../Redux/store'
import {getAllRequestsThunk, type Request} from '../../Redux/Slices/ordersSlice/ordersSliceThunk'
import {apiUrl} from '../../Redux/Config/axiosConfig'
import type {Professional} from '../../Redux/Slices/ordersSlice/requestTypes'
import calendarIcon from '../../assets/icons/calendar-days.svg'
import mapPinIcon from '../../assets/icons/map-pin.svg'
import phoneIcon from '../../assets/icons/phone.svg'
import userIcon from '../../assets/icons/user2.svg'
import statusIcon from '../../assets/icons/status.svg'
import quoteIcon from '../../assets/icons/quote.svg'
import profileIcon from '../../assets/icons/profile.png'

interface LocationState {
    request?: Request
}

interface TruncatedTextProps {
    text: string
}

const TruncatedText = ({text}: TruncatedTextProps) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth
                setIsTruncated(isOverflowing)
            }
        }

        checkTruncation()
        window.addEventListener('resize', checkTruncation)
        return () => window.removeEventListener('resize', checkTruncation)
    }, [text])

    const content = (
        <span
            ref={textRef}
            className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-default"
        >
            {text}
        </span>
    )

    if (isTruncated) {
        return (
            <Tooltip
                title={text}
                placement="top"
                color="#ffffff"
                styles={{
                    container: {
                        color: '#C4C4C4',
                    },
                }}
            >
                {content}
            </Tooltip>
        )
    }

    return content
}

const RequestPage = () => {
    const {requestId} = useParams<{ requestId: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const {requests, loading} = useSelector((state: RootState) => state.orders)
    const [request, setRequest] = useState<Request | null>(null)
    const [selectedProfessionalIndex, setSelectedProfessionalIndex] = useState(0)

    useEffect(() => {
        if (requestId) {
            const locationState = location.state as LocationState | null
            if (locationState?.request) {
                setRequest(locationState.request)
                return
            }

            if (requests.length > 0) {
                const foundRequest = requests.find((r) => r._id === requestId)
                if (foundRequest) {
                    setRequest(foundRequest)
                    return
                }
            }

            dispatch(getAllRequestsThunk({page: 1, limit: 100}))
        }
    }, [requestId, requests, dispatch, location.state])

    useEffect(() => {
        if (requestId && requests.length > 0 && !request) {
            const foundRequest = requests.find((r) => r._id === requestId)
            if (foundRequest) {
                setRequest(foundRequest)
            }
        }
    }, [requestId, requests, request])

    useEffect(() => {
        setSelectedProfessionalIndex(0)
    }, [requestId])

    const handleBack = () => {
        navigate('/orders')
    }

    const getFileUrl = (file: { path: string }): string => {
        const imagePath = file.path.startsWith('/') ? file.path.slice(1) : file.path
        return `${apiUrl}/${imagePath}`
    }

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        const day = date.getDate()
        const monthNames = [
            'Հունվարի',
            'Փետրվարի',
            'Մարտի',
            'Ապրիլի',
            'Մայիսի',
            'Հունիսի',
            'Հուլիսի',
            'Օգոստոսի',
            'Սեպտեմբերի',
            'Հոկտեմբերի',
            'Նոյեմբերի',
            'Դեկտեմբերի',
        ]
        const month = monthNames[date.getMonth()]
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${day} ${month}, ${year}, ${hours}:${minutes}`
    }

    const getStatusText = (status?: string): string => {
        if (!status) return 'Սպասման մեջ'
        const statusMap: Record<string, string> = {
            pending: 'Սպասման մեջ',
            accepted: 'Ընդունված',
            rejected: 'Մերժված',
            in_progress: 'Ընթացքի մեջ',
            completed: 'Ավարտված',
            cancelled: 'Չեղարկված',
        }
        return statusMap[status.toLowerCase()] || status
    }

    const getStatusColor = (status?: string): string => {
        if (!status) return 'text-gray-600'
        const statusLower = status.toLowerCase()
        if (statusLower === 'accepted' || statusLower === 'completed') return 'text-green-600'
        if (statusLower === 'rejected' || statusLower === 'cancelled') return 'text-red-600'
        return 'text-gray-600'
    }

    const handleDelete = () => {
        console.log('Delete request:', request?._id)
        // TODO: Implement delete functionality
    }

    const handleDeactivate = () => {
        console.log('Deactivate request:', request?._id)
        // TODO: Implement deactivate functionality
    }
    if (loading) {
        return (
            <div className="flex flex-col">
                <PageHeader title="Պատվեր" onBack={handleBack} showFilter={false} showSearch={false} showSort={false}
                            showAddButton={false}/>
                <div className="text-center text-gray-500 py-8">Բեռնվում է...</div>
            </div>
        )
    }

    if (!request) {
        return (
            <div className="flex flex-col">
                <PageHeader title="Պատվեր" onBack={handleBack} showFilter={false} showSearch={false} showSort={false}
                            showAddButton={false}/>
                <div className="text-center text-gray-500 py-8">Պատվեր չի գտնվել</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Պատվերներ"
                onBack={handleBack}
                showFilter={false}
                showSearch={false}
                showSort={false}
                showAddButton={false}
            />
            <div className="rounded-lg flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="flex items-start justify-between">
                        <h2 className="text-[18px] font-semibold text-gray-800">
                            {request.service?.name
                                ? typeof request.service.name === 'string'
                                    ? request.service.name
                                    : request.service.name.hy || request.service.name.en || request.service.name.ru || 'N/A'
                                : 'N/A'}
                        </h2>
                        <div className="flex gap-[12px]">
                            <button
                                onClick={handleDelete}
                                style={{
                                    color: '#FF160D',
                                    border: '1px solid #FF160D',
                                    backgroundColor: 'transparent',
                                }}
                                className="rounded-[6px] p-[8px_25px] transition-colors font-bold hover:opacity-80 cursor-pointer"
                            >
                                Ջնջել
                            </button>
                            <button
                                onClick={handleDeactivate}
                                style={{
                                    color: '#7E7E7E',
                                    border: '1px solid #7E7E7E',
                                    backgroundColor: 'transparent',
                                }}
                                className="rounded-[6px] p-[8px_25px] transition-colors hover:opacity-80 cursor-pointer"
                            >
                                Պասիվացնել
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-[50px] space-y-4">
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex items-center gap-[12px]">
                                <img src={calendarIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">{formatDate(request.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-[12px]">
                                <img src={mapPinIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">
                {request.address
                    ? typeof request.address === 'string'
                        ? request.address
                        : request.address.hy || request.address.en || request.address.ru || 'N/A'
                    : 'հասցե նշված չի'}
              </span>
                            </div>

                            <div className="flex items-center gap-[12px]">
                                <img src={phoneIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">
                {request.customer?.countryCode && request.customer?.phoneNumber
                    ? `${request.customer.countryCode} ${request.customer.phoneNumber}`
                    : 'N/A'}
              </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex items-center gap-[12px]">
                                <img src={userIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">
                Պատվիրատու - <span 
                    className="text-[#007BFF] cursor-pointer hover:underline"
                    onClick={() => {
                        const customerId = request.customer?._id
                        if (customerId) {
                            navigate(`/users/${customerId}`)
                        }
                    }}
                >{request.customer?.name || request.fullName || 'N/A'}</span>
              </span>
                            </div>
                            <div className="flex items-center gap-[12px]">
                                <img src={userIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">Մասնագետ - <span
                                    className="text-[#007BFF] cursor-pointer hover:underline"
                                    onClick={() => {
                                        const professional = request.professionals?.[selectedProfessionalIndex]?.professional as Professional | undefined
                                        const specialistUserId = professional?.user?._id
                                        if (specialistUserId) {
                                            navigate(`/users/${specialistUserId}`)
                                        }
                                    }}
                                >{request.professionals?.[selectedProfessionalIndex]?.professional?.fullName || 'N/A'}</span></span>
                            </div>
                            <div className="flex items-center gap-[12px]">
                                <img src={statusIcon} alt="" className="w-6 h-6 text-gray-600"/>
                                <span className="text-gray-800">
                Կարգավիճակ - {getStatusText(request.professionals?.[selectedProfessionalIndex]?.status)}
              </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Կցված ֆայլեր</h3>
                    {request.files && request.files.length > 0 ? (
                        <div className="flex flex-wrap gap-[16px]">
                            {request.files.map((file, index) => (
                                <div key={index} className="rounded-lg p-3 bg-gray-50">
                                    {file.mimetype?.startsWith('image/') ? (
                                        <ImageModal imageUrl={getFileUrl(file)} alt={file.originalname}>
                                            <img
                                                src={getFileUrl(file)}
                                                alt={file.originalname}
                                                className="w-[80px] h-[113px] object-cover rounded"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                }}
                                            />
                                        </ImageModal>
                                    ) : (
                                        <div
                                            className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">PDF</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Կցված ֆայլեր չկան</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Պատվիրատուի մեկնաբանությունը</h3>
                    {request.comment ? (
                        <div className="bg-gray-50 rounded-lg p-4 border-blue-500">
                            <div className="flex items-start gap-[6px]">
                                <img src={quoteIcon} alt="" className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                                <p className="text-gray-800">{request.comment}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Պատվիրատուն չի թողել մեկնաբանություն</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Մասնագետներ
                        ({request.professionals?.length || 0})</h3>
                    {request.professionals && request.professionals.length > 0 ? (
                        <div className="rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-[#ffffff]">
                                <tr>
                                    <th
                                        className="w-[200px] p-[16px] rounded-tl-[6px] text-left text-sm font-semibold text-gray-700"
                                    >
                                        Անուն
                                    </th>
                                    <th
                                        className="w-[160px] p-[16px] text-left text-sm font-semibold text-gray-700"
                                    >
                                        Հեռախոսահամար
                                    </th>
                                    <th
                                        className="w-[200px] p-[16px] text-left text-sm font-semibold text-gray-700"
                                    >
                                        Մեկնաբանություն
                                    </th>
                                    <th
                                        className="w-[150px] p-[16px] rounded-tr-[6px] text-left text-sm font-semibold text-gray-700"
                                    >
                                        Կարգավիճակ
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {request.professionals.map((prof, index) => {
                                    const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'
                                    const professional = prof.professional as Professional | undefined
                                    const professionalImageUrl = professional?.profileImage?.path
                                        ? (() => {
                                            const imagePath = professional.profileImage.path.startsWith('/')
                                                ? professional.profileImage.path.slice(1)
                                                : professional.profileImage.path
                                            return `${apiUrl}/${imagePath}`
                                        })()
                                        : profileIcon

                                    return (
                                        <tr
                                            key={prof._id || index}
                                            className="users-table-row cursor-pointer h-[64px]"
                                            style={{backgroundColor}}
                                            onClick={() => setSelectedProfessionalIndex(index)}
                                        >
                                            <td className="p-[16px] text-sm text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={professionalImageUrl}
                                                        alt={prof.professional?.fullName || 'Professional'}
                                                        className="object-cover w-[32px] h-[32px] rounded-[8px]"
                                                        onError={(e) => {
                                                            e.currentTarget.src = profileIcon
                                                        }}
                                                    />
                                                    <span>{prof.professional?.fullName || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="p-[16px] text-sm text-gray-800">
                                                {prof.professional?.countryCode && prof.professional?.phoneNumber
                                                    ? `${prof.professional.countryCode} ${prof.professional.phoneNumber}`
                                                    : 'N/A'}
                                            </td>
                                            <td className="p-[16px] max-w-[200px] text-sm text-gray-800">
                                                {prof.comment ? (
                                                    <TruncatedText text={prof.comment}/>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="p-[16px] text-sm">
                          <span className={getStatusColor(prof.status)}>
                            {getStatusText(prof.status)}
                          </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">Առայժմ ոչ մի մասնագետ չի պատասխանել հարցմանը</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RequestPage
