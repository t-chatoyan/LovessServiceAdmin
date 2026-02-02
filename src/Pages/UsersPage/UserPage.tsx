import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Pagination, Dropdown, Tooltip, type MenuProps, Collapse, type CollapseProps} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import PageHeader from '../../Components/PageHeader'
import ImageModal from '../../Components/ImageModal'
import type {AppDispatch, RootState} from '../../Redux/store'
import {getUserByIdThunk} from '../../Redux/Slices/usersSlice/usersSliceThunk'
import {getUserRequestsThunk} from '../../Redux/Slices/ordersSlice/ordersSliceThunk'
import {apiUrl} from '../../Redux/Config/axiosConfig'
import type {User, Profession} from '../../types/sharedTypes.ts'
import phoneIcon from '../../assets/icons/phone.svg'
import mapPinIcon from '../../assets/icons/map-pin.svg'
import profileIcon from '../../assets/icons/profile.png'
import eyeIcon from '../../assets/icons/eye.svg'
import uploadIcon from '../../assets/icons/upload.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'

const UserPage = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {selectedUser, loading} = useSelector((state: RootState) => state.users)
    const {userRequests, userRequestsLoading, userRequestsPagination} = useSelector((state: RootState) => state.orders)
    const [user, setUser] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (id) {
            const language = localStorage.getItem('language') || 'en'
            dispatch(getUserByIdThunk({id, language}))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (selectedUser && selectedUser._id) {
            setUser(selectedUser)
        }
    }, [selectedUser])

    useEffect(() => {
        if (id) {
            dispatch(getUserRequestsThunk({userId: id, page: currentPage, limit: 10}))
        }
    }, [id, currentPage, dispatch])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleBack = () => {
        navigate('/users')
    }

    const handleDelete = () => {
        console.log('Delete user:', user?._id)
    }

    const handleDeactivate = () => {
        console.log('Deactivate user:', user?._id)
    }

    const handleActivate = () => {
        console.log('Activate user:', user?._id)
    }

    const handleViewRequest = (requestId: string) => {
        const request = userRequests.find((r) => r._id === requestId)
        navigate(`/orders/${requestId}`, {state: {request}})
    }

    const handleEditRequest = (requestId: string) => {
        console.log('Edit request:', requestId)
    }

    const handleDeleteRequest = (requestId: string) => {
        console.log('Delete request:', requestId)
    }

    const getMenuItems = (requestId: string): MenuProps['items'] => [
        {
            key: 'view',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={eyeIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Դիտել</span>
                </div>
            ),
            onClick: () => {
                handleViewRequest(requestId)
            },
        },
        {
            key: 'edit',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={uploadIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Խմբագրել</span>
                </div>
            ),
            onClick: () => {
                handleEditRequest(requestId)
            },
        },
        {
            key: 'delete',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={trashboxIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span className="text-[#FF160D]">Ջնջել</span>
                </div>
            ),
            onClick: () => {
                handleDeleteRequest(requestId)
            },
        },
    ]
    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }
    const formatTime = (dateString: string): string => {
        if (!dateString) return 'Տեղեկություն չկա'
        const date = new Date(dateString)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const getMultilingualName = (name: string | { hy?: string; en?: string; ru?: string } | undefined): string => {
        if (!name) return 'N/A'
        if (typeof name === 'string') return name
        const language = localStorage.getItem('language') || 'hy'
        return name[language as keyof typeof name] || name.hy || name.en || name.ru || 'N/A'
    }

    if (loading) {
        return (
            <div className="flex flex-col">
                <PageHeader
                    title="Օգտատեր"
                    onBack={handleBack}
                    showFilter={false}
                    showSearch={false}
                    showSort={false}
                    showAddButton={false}
                />
                <div className="text-center text-gray-500 py-8">Բեռնվում է...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col">
                <PageHeader
                    title="Օգտատեր"
                    onBack={handleBack}
                    showFilter={false}
                    showSearch={false}
                    showSort={false}
                    showAddButton={false}
                />
                <div className="text-center text-gray-500 py-8">Օգտատեր չի գտնվել</div>
            </div>
        )
    }

    const professions = user.professions
    const profileImageUrl = professions && Array.isArray(professions) && professions.length > 0
        ? (() => {
            const firstProfession = professions[0] as Profession
            if (firstProfession?.profileImage?.path) {
                const imagePath = firstProfession.profileImage.path.startsWith('/')
                    ? firstProfession.profileImage.path.slice(1)
                    : firstProfession.profileImage.path
                return `${apiUrl}/${imagePath}`
            }
            return profileIcon
        })()
        : profileIcon
    console.log(user, "user----");
    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Օգտատեր"
                onBack={handleBack}
                showFilter={false}
                showSearch={false}
                showSort={false}
                showAddButton={false}
            />
            <div className="rounded-lg flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-[24px]">
                            <ImageModal imageUrl={profileImageUrl} alt={user.name || 'User'}>
                                <img
                                    src={profileImageUrl}
                                    alt={user.name || 'User'}
                                    className="object-cover w-[100px] h-[100px] rounded-[50%] border border-[#ffffff]"
                                    onError={(e) => {
                                        e.currentTarget.src = profileIcon
                                    }}
                                />
                            </ImageModal>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-[20px] font-normal ">{user?.name || 'N/A'} {(user?.professions?.length ?? 0) > 0 ? "(Մասնագետ)" : ""}</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-[12px]">
                                        <img src={phoneIcon} alt="" className="w-6 h-6"
                                             style={{filter: 'grayscale(100%) opacity(0.6)'}}/>
                                        <span className="text-gray-800">
                                            {user.countryCode && user.phoneNumber
                                                ? `${user.countryCode} ${user.phoneNumber}`
                                                : user.phoneNumber || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-[12px]">
                                        <img src={mapPinIcon} alt="" className="w-6 h-6"
                                             style={{filter: 'grayscale(100%) opacity(0.6)'}}/>
                                        <span className="text-gray-800">
                                            հասցե
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-[12px]">
                            <button
                                onClick={handleDelete}
                                className="text-[#FF160D] border border-[#FF160D] bg-transparent h-[38px] text-[14px] font-bold rounded-[6px] p-[8px_25px] transition-colors hover:opacity-80 cursor-pointer"
                            >
                                Ջնջել
                            </button>
                            <button
                                onClick={handleActivate}
                                className="text-[#2ED889] border border-[#2ED889] bg-transparent h-[38px] text-[14px] font-bold rounded-[6px] p-[8px_25px] transition-colors hover:opacity-80 cursor-pointer"
                            >
                                Ակտիվացնել
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className="text-[#7E7E7E] border border-[#7E7E7E] bg-transparent h-[38px] text-[14px] font-bold rounded-[6px] p-[9px_25px] transition-colors hover:opacity-80 cursor-pointer"
                            >
                                Պասիվացնել
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[16px]">
                        <h3 className='text-lg font-semibold text-gray-800'>
                            Մասնագիտություններ ({professions?.length || 0})
                        </h3>

                        {professions && professions.length > 0 ? (
                            <Collapse
                                items={professions.map((profession, professionIndex) => {
                                    const category = profession.category as {
                                        name?: string | { hy?: string; en?: string; ru?: string }
                                    } | undefined
                                    const categoryName = category && category.name
                                        ? getMultilingualName(category.name)
                                        : 'N/A'
                                    const professionServices = profession.profession_services || []

                                    const fullName = profession.fullName as string | undefined
                                    const phoneNumber = profession.phoneNumber as string | undefined
                                    const countryCode = profession.countryCode as string | undefined
                                    const type = profession.type as number | undefined
                                    const isActive = profession.isActive !== undefined ? profession.isActive : true
                                    const allowedOrderCountries = profession.allowedOrderCountries as string[] | undefined
                                    const activationPeriod = profession.activationPeriod as {
                                        durationMonths?: number
                                        price?: number
                                        activatedAt?: string
                                        expiresAt?: string
                                    } | undefined
                                    const workingDays = profession.workingDays as Array<{
                                        day?: string
                                        start?: string
                                        end?: string
                                        _id?: string
                                    }> | undefined
                                    const files = profession.files as Array<{
                                        originalname?: string
                                        filename?: string
                                        path?: string
                                    }> | undefined
                                    const portfolioImages = profession.portfolioImages as Array<{
                                        originalname?: string
                                        filename?: string
                                        path?: string
                                    }> | undefined
                                    const createdAt = profession.createdAt as string | undefined

                                    const formatTariff = (): string => {
                                        if (!activationPeriod) return 'N/A'
                                        const {durationMonths, price} = activationPeriod
                                        if (durationMonths === 6) {
                                            return 'Tarif1'
                                        }
                                        if (price !== undefined) {
                                            return `${price} ֏`
                                        }
                                        return 'N/A'
                                    }

                                    const formatWorkingDays = () => {
                                        if (!workingDays || workingDays.length === 0) return 'N/A'

                                        const allDaysSameHours = workingDays.length === 7 &&
                                            workingDays.every(day =>
                                                day.start === '00:00' && day.end === '23:59'
                                            )

                                        if (allDaysSameHours) {
                                            return <span className="text-sm text-gray-800">24/7</span>
                                        }

                                        const dayNamesMap: Record<string, string> = {
                                            'monday': 'Երկուշաբթի',
                                            'tuesday': 'Երեքշաբթի',
                                            'wednesday': 'Չորեքշաբթի',
                                            'thursday': 'Հինգշաբթի',
                                            'friday': 'Ուրբաթ',
                                            'saturday': 'Շաբաթ',
                                            'sunday': 'Կիրակի'
                                        }

                                        return (
                                            <div className="flex flex-wrap gap-5">
                                                {workingDays.map((dayItem, index) => {
                                                    const dayName = dayItem.day ? dayNamesMap[dayItem.day.toLowerCase()] || dayItem.day : ''
                                                    const startTime = dayItem.start || ''
                                                    const endTime = dayItem.end || ''
                                                    const timeRange = startTime && endTime ? `${startTime} - ${endTime}` : ''

                                                    if (!dayName) return null

                                                    return (
                                                        <div key={dayItem._id || index} className="flex flex-col gap-1">
                                                            <span className="text-sm text-gray-800">{dayName}</span>
                                                            {timeRange && (
                                                                <span
                                                                    className="text-xs text-gray-600">{timeRange}</span>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }

                                    const formatFiles = () => {
                                        if (!files || files.length === 0) return 'N/A'

                                        const imagesArray = files
                                            .map((file) => {
                                                const imagePath = file.path
                                                    ? (file.path.startsWith('/') ? file.path.slice(1) : file.path)
                                                    : null
                                                return imagePath ? {
                                                    url: `${apiUrl}/${imagePath}`,
                                                    alt: file.originalname || file.filename || 'File'
                                                } : null
                                            })
                                            .filter((item): item is { url: string; alt: string } => item !== null)

                                        if (imagesArray.length === 0) return 'N/A'

                                        return (
                                            <div className="flex flex-wrap gap-2">
                                                {imagesArray.map((image, index) => (
                                                    <ImageModal
                                                        key={index}
                                                        imageUrl={image.url}
                                                        alt={image.alt}
                                                        images={imagesArray}
                                                        currentIndex={index}
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt={image.alt}
                                                            className="w-[50px] h-[50px] object-cover rounded cursor-pointer border border-gray-200"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none'
                                                            }}
                                                        />
                                                    </ImageModal>
                                                ))}
                                            </div>
                                        )
                                    }

                                    const formatPortfolio = () => {
                                        if (!portfolioImages || portfolioImages.length === 0) return 'N/A'

                                        const imagesArray = portfolioImages
                                            .map((image) => {
                                                const imagePath = image.path
                                                    ? (image.path.startsWith('/') ? image.path.slice(1) : image.path)
                                                    : null
                                                return imagePath ? {
                                                    url: `${apiUrl}/${imagePath}`,
                                                    alt: image.originalname || image.filename || 'Portfolio'
                                                } : null
                                            })
                                            .filter((item): item is { url: string; alt: string } => item !== null)

                                        if (imagesArray.length === 0) return 'N/A'

                                        return (
                                            <div className="flex flex-wrap gap-2">
                                                {imagesArray.map((image, index) => (
                                                    <ImageModal
                                                        key={index}
                                                        imageUrl={image.url}
                                                        alt={image.alt}
                                                        images={imagesArray}
                                                        currentIndex={index}
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt={image.alt}
                                                            className="w-[50px] h-[50px] object-cover rounded cursor-pointer border border-gray-200"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none'
                                                            }}
                                                        />
                                                    </ImageModal>
                                                ))}
                                            </div>
                                        )
                                    }

                                    const generalInfoItem = {
                                        key: `general-info-${profession._id || professionIndex}`,
                                        label: 'Ընդհանուր տվյալներ',
                                        children: (
                                            <div className="py-2">
                                                <table className="w-full">
                                                    <tbody>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Անուն</td>
                                                        <td className="p-[12px] text-sm text-gray-800">{fullName || 'N/A'}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Հեռախոսահամար</td>
                                                        <td className="p-[12px] text-sm text-gray-800">
                                                            {countryCode && phoneNumber ? `${countryCode} ${phoneNumber}` : phoneNumber || 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Տեսակը</td>
                                                        <td className="p-[12px] text-sm text-gray-800">
                                                            {type === 0 ? 'Անհատ' : type === 1 ? 'Կազմակերպություն' : type !== undefined ? type.toString() : 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Ստատուս</td>
                                                        <td className="p-[12px]">
                                                                <span
                                                                    className={`text-sm font-medium ${isActive ? 'text-[#2ED889]' : 'text-[#7E7E7E]'}`}>
                                                                    {isActive ? (
                                                                        activationPeriod?.activatedAt && activationPeriod?.expiresAt
                                                                            ? `Ակտիվ Է  ${formatDate(activationPeriod.activatedAt)} - ${formatDate(activationPeriod.expiresAt)}`
                                                                            : 'Պասիվ'
                                                                    ) : (
                                                                        'Անակտիվ'
                                                                    )}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Տարիֆ</td>
                                                        <td className="p-[12px] text-sm text-gray-800">{formatTariff()}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Թույլատրված
                                                            երկրներ
                                                        </td>
                                                        <td className="p-[12px] text-sm text-gray-800">
                                                            {allowedOrderCountries && allowedOrderCountries.length > 0 ? allowedOrderCountries.join(', ') : 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Աշխատանքային
                                                            ժամեր/օրեր
                                                        </td>
                                                        <td className="p-[12px] text-sm text-gray-800">{formatWorkingDays()}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Ֆայլեր</td>
                                                        <td className="p-[12px] text-sm text-gray-800">{formatFiles()}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-300">
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Պորտֆոլիո</td>
                                                        <td className="p-[12px] text-sm text-gray-800">{formatPortfolio()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-[300px] p-[12px] text-sm font-semibold text-gray-700 align-top">Ստեղծման
                                                            ամսաթիվը
                                                        </td>
                                                        <td className="p-[12px] text-sm text-gray-800">{createdAt ? formatDate(createdAt) : 'N/A'}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ),
                                    }

                                    const serviceItems: CollapseProps['items'] = professionServices.map((profService, serviceIndex) => {
                                        const serviceName = profService.service
                                            ? getMultilingualName(profService.service.name)
                                            : 'N/A'
                                        const subServices = profService.subServices || []

                                        return {
                                            key: profService._id || `service-${serviceIndex}`,
                                            label: serviceName,
                                            children: subServices.length > 0 ? (
                                                <div className="flex flex-col gap-[8px]">
                                                    {subServices.map((subService, subIndex) => {
                                                        const subServiceName = getMultilingualName(subService.name)
                                                        return (
                                                            <div
                                                                key={subService._id || subIndex}
                                                                className="flex items-center gap-[8px] py-[4px]"
                                                            >
                                                                <div
                                                                    className="w-[4px] h-[4px] rounded-full bg-gray-400"></div>
                                                                <span className="text-sm text-gray-600">
                                                                    {subServiceName}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500 py-2">
                                                    Ենթակատեգորիաներ չկան
                                                </div>
                                            ),
                                        }
                                    })

                                    return {
                                        key: profession._id || `profession-${professionIndex}`,
                                        label: categoryName,
                                        children: (
                                            <div className="flex flex-col gap-[16px]">
                                                {/* General Information Collapse */}
                                                <Collapse
                                                    items={[generalInfoItem]}
                                                    defaultActiveKey={[generalInfoItem.key as string]}
                                                />

                                                {/* Services Header */}
                                                <div className="flex flex-col gap-[12px]">
                                                    <h4 className="text-base font-semibold text-gray-800">
                                                        Սերվիսներ ({professionServices.length})
                                                    </h4>

                                                    {/* Services Collapse */}
                                                    {professionServices.length > 0 ? (
                                                        <Collapse
                                                            items={serviceItems}
                                                            defaultActiveKey={serviceItems.length > 0 && serviceItems[0] ? [serviceItems[0].key as string] : []}
                                                        />
                                                    ) : (
                                                        <div className="text-sm text-gray-500 py-2">
                                                            Ծառայություններ չկան
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    }
                                })}
                            />
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 p-[16px]">
                                <div className="text-sm text-gray-500 text-center py-4">
                                    Մասնագիտություններ չկան
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-[32px]">
                    <h3 className="text-lg font-semibold text-gray-800">Պատվերներ</h3>
                    <div className="bg-white rounded-lg overflow-auto">
                        <table className="w-full">
                            <thead className="bg-[#ffffff]">
                            <tr>
                                <th className="w-[30px] p-[16px] rounded-tl-[6px] text-left text-sm font-semibold text-gray-700">
                                    ID
                                </th>
                                <th className="w-[200px] p-[16px] text-left text-sm font-semibold text-gray-700">
                                    Մասնագետ
                                </th>
                                <th className="w-[120px] p-[16px] text-left text-sm font-semibold text-gray-700">
                                    Ամսաթիվ
                                </th>
                                <th className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700">
                                    Կատեգորիա
                                </th>
                                <th className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700">
                                    Ենթակատեգորիա
                                </th>
                                <th className="w-[160px] p-[16px] text-left text-sm font-semibold text-gray-700">
                                    Հեռախոսահամար
                                </th>
                                <th className="w-[30px] p-[16px] rounded-tr-[6px] text-right text-sm font-semibold text-gray-700">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {userRequests?.length > 0 ? (
                                userRequests.map((request, index) => {
                                    const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'
                                    return (
                                        <tr
                                            key={request._id || index}
                                            className="transition-colors cursor-pointer users-table-row h-[64px]"
                                            style={{backgroundColor}}
                                            onClick={() => handleViewRequest(request._id)}
                                        >
                                            <td className="w-[30px] p-[16px]">
                                                <input
                                                    type="checkbox"
                                                    className="cursor-pointer w-[18px] h-[18px]"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </td>
                                            <td className="w-[200px] p-[16px] text-sm text-gray-600">
                                                {request.professionals?.[0]?.professional?.fullName || 'N/A'}
                                            </td>
                                            <td className="w-[120px] p-[16px] text-sm text-gray-600">
                                                <Tooltip
                                                    title={formatTime(request.createdAt)}
                                                    placement="top"
                                                    color="#ffffff"
                                                    styles={{
                                                        container: {
                                                            color: '#C4C4C4',
                                                        },
                                                    }}
                                                >
                                                    <span
                                                        className="cursor-default">{formatDate(request.createdAt)}</span>
                                                </Tooltip>
                                            </td>
                                            <td className="w-[150px] p-[16px] text-sm text-gray-600">
                                                {request.service?.name
                                                    ? typeof request.service.name === 'string'
                                                        ? request.service.name
                                                        : request.service.name.hy || request.service.name.en || request.service.name.ru || 'N/A'
                                                    : 'N/A'}
                                            </td>
                                            <td className="w-[150px] p-[16px] text-sm text-gray-600">
                                                {request.problems && request.problems.length > 0
                                                    ? typeof request.problems[0].title === 'string'
                                                        ? request.problems[0].title
                                                        : request.problems[0].title.hy || request.problems[0].title.en || request.problems[0].title.ru || 'N/A'
                                                    : 'N/A'}
                                            </td>
                                            <td className="w-[160px] p-[16px] text-sm text-gray-600">
                                                {request.customer?.countryCode && request.customer?.phoneNumber
                                                    ? `${request.customer.countryCode}${request.customer.phoneNumber}`
                                                    : request.professionals?.[0]?.professional?.countryCode && request.professionals?.[0]?.professional?.phoneNumber
                                                        ? `${request.professionals[0].professional.countryCode}${request.professionals[0].professional.phoneNumber}`
                                                        : 'N/A'}
                                            </td>
                                            <td
                                                className="w-[30px] p-[16px] flex items-center justify-end"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Dropdown
                                                    menu={{items: getMenuItems(request._id)}}
                                                    trigger={['click']}
                                                    placement="bottomRight"
                                                >
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <MoreOutlined className="text-gray-600 text-[24px]"/>
                                                    </button>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-gray-500">
                                        <div>
                                            {userRequestsLoading ? 'Բեռնվում է...' : 'Պատվերներ չկան'}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col justify-end items-end gap-[16px]">
                        <div className="text-sm text-gray-700 font-[700]">
                            Ընդհանուր ({userRequestsPagination?.total || 0})
                        </div>
                        {userRequestsPagination && userRequestsPagination.total > 0 && (
                            <Pagination
                                current={userRequestsPagination.page}
                                total={userRequestsPagination.total}
                                pageSize={userRequestsPagination.limit}
                                onChange={handlePageChange}
                                disabled={userRequestsLoading}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
