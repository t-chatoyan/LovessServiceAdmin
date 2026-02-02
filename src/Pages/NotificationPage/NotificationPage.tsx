import {useEffect, useState} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import PageHeader from '../../Components/PageHeader'
import calendarIcon from '../../assets/icons/calendar-days.svg'
import bellIcon from '../../assets/icons/bell.svg'
import phoneIcon from '../../assets/icons/phone.svg'
import userIcon from '../../assets/icons/user2.svg'
import statusIcon from '../../assets/icons/status.svg'
import type {AppDispatch, RootState} from '../../Redux/store'
import {getNotificationsThunk, type Notification} from '../../Redux/Slices/notificationsSlice/notificationsSliceThunk'
import type {NotificationWithRequest} from '../../Redux/Slices/notificationsSlice/notificationTypes'

interface LocationState {
    notification?: Notification
}

const NotificationPage = () => {
    const {notificationId} = useParams<{ notificationId: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const {notifications} = useSelector((state: RootState) => state.notifications)
    const [notification, setNotification] = useState<Notification | null>(null)

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

    const getServiceName = (notif: Notification | null): string => {
        if (!notif) return 'N/A'
        const notificationWithRequest = notif as NotificationWithRequest
        const request = notificationWithRequest.request
        const service = request?.service
        if (!service?.name) return 'N/A'
        const serviceName = service.name
        return typeof serviceName === 'string' ? serviceName : serviceName.hy || serviceName.en || serviceName.ru || 'N/A'
    }

    useEffect(() => {
        if (notificationId) {
            const locationState = location.state as LocationState | null
            if (locationState?.notification) {
                setNotification(locationState.notification)
                console.log('Notification from location state:', locationState.notification)
                return
            }

            if (notifications.length > 0) {
                const foundNotification = notifications.find((n) => n._id === notificationId)
                if (foundNotification) {
                    setNotification(foundNotification)
                    console.log('Notification from Redux store:', foundNotification)
                    return
                }
            }

            dispatch(getNotificationsThunk({page: 1, limit: 100}))
        }
    }, [notificationId, notifications, dispatch, location.state])

    useEffect(() => {
        if (notificationId && notifications.length > 0 && !notification) {
            const foundNotification = notifications.find((n) => n._id === notificationId)
            if (foundNotification) {
                setNotification(foundNotification)
                console.log('Notification found after fetch:', foundNotification)
            }
        }
    }, [notificationId, notifications, notification])

    const handleBack = () => {
        navigate('/notifications')
    }

    const handleDelete = () => {
        console.log('Delete notification:', notification?._id)
        // TODO: Implement delete functionality
    }

    console.log('Current notification:', notification)
    console.log('Notification ID:', notificationId)

    if (!notification) {
        return (
            <div className="flex flex-col">
                <PageHeader
                    title="Ծանուցում"
                    onBack={handleBack}
                    showFilter={false}
                    showSearch={false}
                    showSort={false}
                    showAddButton={false}
                />
                <div className="text-center text-gray-500 py-8">Ծանուցում չի գտնվել</div>
            </div>
        )
    }

    const notificationWithRequest = notification as NotificationWithRequest

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Ծանուցում"
                onBack={handleBack}
                showFilter={false}
                showSearch={false}
                showSort={false}
                showAddButton={false}
            />
            <div className=" rounded-lg flex flex-col gap-[30px]">
                <div className="flex items-start justify-between items-center">
                    <h2 className="text-[18px]  text-gray-800">
                        {notification?.user?.name || 'N/A'}
                    </h2>
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
                </div>
                <div className="flex gap-[50px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex items-center gap-[12px]">
                            <img src={calendarIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">{formatDate(notification?.createdAt || '')}</span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <img src={phoneIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">
                                {notification?.user?.countryCode && notification?.user?.phoneNumber
                                    ? `${notification.user.countryCode} ${notification.user.phoneNumber}`
                                    : 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <img src={bellIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">Տեսակը - {notification?.type === "new_request" ? "Հայտ" : "Պատասխան"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex items-center gap-[12px]">
                            <img src={userIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">
                              Ստացող՝ {notification?.type === "new_request" ? "Մասնագետ" : "Պատվիրատու"} - <span 
                                className="text-[#007BFF] cursor-pointer hover:underline"
                                onClick={() => {
                                    const userId = notification?.user?._id
                                    if (userId) {
                                        navigate(`/users/${userId}`)
                                    }
                                }}
                              >{notification?.user?.name || 'N/A'}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <img src={userIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">
                              Ուղարկող՝ {notification?.type === "new_request" ? "Պատվիրատու" : "Մասնագետ"} - <span 
                                className="text-[#007BFF] cursor-pointer hover:underline"
                                onClick={() => {
                                    if (notification?.type === "new_request") {
                                        const customerId = notificationWithRequest.request?.customer?._id
                                        if (customerId) {
                                            navigate(`/users/${customerId}`)
                                        }
                                    } else {
                                        const userId = notification?.user?._id
                                        if (userId) {
                                            navigate(`/users/${userId}`)
                                        }
                                    }
                                }}
                              >{notification?.type === "new_request" ? notificationWithRequest.request?.fullName || 'N/A' : (typeof notificationWithRequest.title === 'string' ? notificationWithRequest.title : 'N/A')}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <img src={statusIcon} alt="" className="w-6 h-6 text-gray-600"/>
                            <span className="text-gray-800">
                                Ստատուս - {notification?.isRead ? `կարդացվել է ${formatDate(notification?.updatedAt || '')} -ին` : 'Չկարդացած'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[10px]">
                       <h3 className="text-[18px]">Ծանուցման նկարագրությունը</h3>
                        <p>{notification?.body}</p>

                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <h3 className="text-[18px]">Ծառայությունը</h3>
                        <p>{getServiceName(notification)}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPage
