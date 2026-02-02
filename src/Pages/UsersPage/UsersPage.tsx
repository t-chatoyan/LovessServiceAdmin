import PageHeader from '../../Components/PageHeader'
import ImageModal from '../../Components/ImageModal'
import AddUserForm from '../../Components/AddUserForm'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getAllUsersThunk} from '../../Redux/Slices/usersSlice/usersSliceThunk'
import type {AppDispatch, RootState} from '../../Redux/store'
import {Dropdown, Tooltip, Modal, type MenuProps} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import eyeIcon from '../../assets/icons/eye.svg'
import uploadIcon from '../../assets/icons/upload.svg'
import banIcon from '../../assets/icons/ban.svg'
import trashboxIcon from '../../assets/icons/trashbox.svg'
import profileIcon from '../../assets/icons/profile.png'
import {apiUrl} from '../../Redux/Config/axiosConfig'
import type {Profession} from '../../types/sharedTypes.ts'

const UsersPage = () => {
    const {users, loading, error} = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])

    console.log(users, loading, error, 'users data')

    const filterOptions = [
        {label: 'Բոլորը', value: 'all'},
        {label: 'Ակտիվ', value: 'active'},
        {label: 'Անակտիվ', value: 'inactive'},
        {label: 'Վերացված', value: 'deleted'},
    ]

    const sortOptions = [
        {label: 'Նորեր', value: 'newest'},
        {label: 'Հիներ', value: 'oldest'},
        {label: 'Անուն', value: 'name'},
        {label: 'Էլ. փոստ', value: 'email'},
    ]

    const handleSearch = (value: string) => {
        console.log('Search users:', value)
    }

    const handleSortChange = (value: string) => {
        console.log('Sort users:', value)
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true)
    }

    const handleModalClose = () => {
        setIsAddModalOpen(false)
    }

    const handleView = (userId: string) => {
        const user = users.find((u) => u._id === userId)
        if (user) {
            navigate(`/users/${userId}`, {state: {user}})
        } else {
            navigate(`/users/${userId}`)
        }
    }

    const handleRowClick = (userId: string) => {
        handleView(userId)
    }

    const handleActivate = (userId: string) => {
        console.log('Activate user:', userId)
    }

    const handleDeactivate = (userId: string) => {
        console.log('Deactivate user:', userId)
    }

    const handleDelete = (userId: string) => {
        console.log('Delete user:', userId)
    }

    const getMenuItems = (userId: string): MenuProps['items'] => [
        {
            key: 'view',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={eyeIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Դիտել</span>
                </div>
            ),
            onClick: () => {
                handleView(userId)
            },
        },
        {
            key: 'activate',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={uploadIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Ակտիվացնել</span>
                </div>
            ),
            onClick: () => {
                handleActivate(userId)
            },
        },
        {
            key: 'deactivate',
            label: (
                <div className="flex items-center gap-[7px]">
                    <img src={banIcon} alt="" className="w-[16px] h-[16px]"/>
                    <span>Պասիվացնել</span>
                </div>
            ),
            onClick: () => {
                handleDeactivate(userId)
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
                handleDelete(userId)
            },
        },
    ]

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const getStatusTooltipText = (user: {
        isOnline?: boolean;
        lastSeen?: string;
        lastActiveAt?: string;
        [key: string]: unknown
    }): string => {
        if (user.isOnline === true) {
            if (user.lastActiveAt) {
                return `Ակտիվ է սկսած ${formatTime(user.lastActiveAt)}-ից`
            }
            return 'Ակտիվ է հիմա'
        } else {
            if (!user.lastSeen) {
                return 'Տեղեկություն չկա'
            }

            const lastSeenDate = new Date(user.lastSeen)
            const now = new Date()
            const diffMs = now.getTime() - lastSeenDate.getTime()
            const diffMins = Math.floor(diffMs / 60000)
            const diffHours = Math.floor(diffMs / 3600000)
            const diffDays = Math.floor(diffMs / 86400000)

            if (diffMins < 1) {
                return 'Ակտիվ է հիմա'
            } else if (diffMins < 60) {
                return `Ակտիվ է եղել ${diffMins} րոպե առաջ`
            } else if (diffHours < 24) {
                return `Ակտիվ է եղել ${diffHours} ժամ առաջ`
            } else {
                return `Ակտիվ է եղել ${diffDays} օր առաջ`
            }
        }
    }

    return (
        <div className="flex flex-col gap-[50px]">
            <PageHeader
                title="Օգտատերեր"
                filterOptions={filterOptions}
                searchPlaceholder="Search"
                sortOptions={sortOptions}
                sortDefaultValue="newest"
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onAddClick={handleAddClick}
            />

            <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#ffffff]">
                    <tr>
                        <th
                            className="w-[30px] p-[16px] rounded-tl-[6px] text-left text-sm font-semibold text-gray-700"
                        >
                            ID
                        </th>
                        <th
                            className="w-[200px] p-[16px] text-left text-sm font-semibold text-gray-700"
                        >
                            Անուն
                        </th>
                        <th
                            className="w-[160px] p-[16px] text-left text-sm font-semibold text-gray-700"
                        >
                            Հեռախոսահամար
                        </th>
                        <th
                            className="w-[100px] p-[16px] text-left text-sm font-semibold text-gray-700"
                        >
                            Մասնագետ
                        </th>
                        <th
                            className="w-[100px] p-[16px] text-left text-sm font-semibold text-gray-700"
                        >
                            Ստատուս
                        </th>
                        <th
                            className="w-[150px] p-[16px] text-left text-sm font-semibold text-gray-700"
                        >
                            Տարիֆ
                        </th>
                        <th
                            className="w-[30px] p-[16px] rounded-tr-[6px] text-right text-sm font-semibold text-gray-700"
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.length > 0 ? (
                        users.map((user, index) => {
                            const backgroundColor = index % 2 === 0 ? '#F7F6FE' : '#FFFFFF'
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
                            
                            const tariff = professions && Array.isArray(professions) && professions.length > 0
                                ? (() => {
                                    for (const profession of professions) {
                                        const prof = profession as Profession
                                        if (prof?.activationPeriod) {
                                            const {durationMonths, activatedAt} = prof.activationPeriod
                                            if (durationMonths === 6) {
                                                let formattedDate = 'N/A'
                                                if (activatedAt) {
                                                    const date = new Date(activatedAt)
                                                    const day = String(date.getDate()).padStart(2, '0')
                                                    const month = String(date.getMonth() + 1).padStart(2, '0')
                                                    const year = date.getFullYear()
                                                    formattedDate = `${day}-${month}-${year}`
                                                }
                                                return `Tarif1 / ${formattedDate}`
                                            }
                                        }
                                    }
                                    return '-'
                                })()
                                : '-'

                            return (
                                <tr
                                    key={user._id || index}
                                    className="transition-colors users-table-row cursor-pointer h-[64px]"
                                    style={{backgroundColor}}
                                    onClick={() => handleRowClick(user._id)}
                                >
                                    <td className="w-[30px] p-[16px]">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer w-[18px] h-[18px]"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td className="w-[200px] p-[16px]">
                                        <div className="flex items-center gap-2">
                                            <ImageModal imageUrl={profileImageUrl} alt={user.name as string || 'User'}>
                                                <img
                                                    src={profileImageUrl}
                                                    alt={user.name as string || 'User'}
                                                    className="object-cover w-[32px] h-[32px] rounded-[8px]"
                                                    onError={(e) => {
                                                        e.currentTarget.src = profileIcon
                                                    }}
                                                />
                                            </ImageModal>
                                            <span className="text-sm  cursor-pointer">
                          {user.name || 'N/A'}
                        </span>
                                        </div>
                                    </td>
                                    <td className="w-[160px] p-[16px] text-sm text-gray-600">
                                        {user.countryCode && user.phoneNumber
                                            ? `${user.countryCode}${user.phoneNumber}`
                                            : user.phoneNumber || 'N/A'}
                                    </td>
                                    <td className="w-[100px] p-[16px] text-sm text-gray-600">
                                        {professions && Array.isArray(professions) && professions.length > 0 ? 'Այո' : 'Ոչ'}
                                    </td>
                                    <td className="w-[100px] p-[16px] text-sm">
                                        <Tooltip
                                            title={getStatusTooltipText(user)}
                                            placement="top"
                                            color="#ffffff"
                                            styles={{
                                                container: {
                                                    color: '#C4C4C4'
                                                }
                                            }}
                                        >
                        <span className="cursor-default" style={{
                            color: user.isOnline ? '#2ED889' : '#7E7E7E'
                        }}>
                          {user.isOnline === true ? 'Օնլայն' : 'Օֆլայն'}
                        </span>
                                        </Tooltip>
                                    </td>
                                    <td className="w-[150px] p-[16px] text-sm text-gray-600">
                                        {tariff}
                                    </td>
                                    <td className="w-[30px] p-[16px] flex items-center justify-end">
                                        <Dropdown
                                            menu={{items: getMenuItems(user._id)}}
                                            trigger={['click']}
                                            placement="bottomRight"
                                            styles={{root: {width: '200px'}}}
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
                                    {loading ? 'Բեռնվում է...' : 'Օգտատերեր չկան'}
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot className="backgroundTransparent">
                    <tr className="backgroundTransparent">
                        <td colSpan={7} className="p-[16px] text-right text-sm text-gray-700 font-[700]">
                            Ընդհանուր ({users?.length || 0})
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <Modal
                open={isAddModalOpen}
                onCancel={handleModalClose}
                footer={null}
                centered
                title="Նոր օգտատեր"
                width={838}
                height={432}
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
                <AddUserForm onCancel={handleModalClose} />
            </Modal>
        </div>
    )
}

export default UsersPage


