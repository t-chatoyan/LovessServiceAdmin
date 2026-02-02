export interface MultilingualName {
    hy?: string
    en?: string
    ru?: string
}

export interface ProfileImage {
    path: string
    originalname?: string
    filename?: string
    mimetype?: string
    size?: number
    [key: string]: unknown
}

export interface Service {
    _id?: string
    name?: string | MultilingualName
}

export interface ServiceApi {
    id: string
    name: {
        hy?: string
        en?: string
        [key: string]: string | undefined
    }
    [key: string]: unknown
}

export interface SubService {
    _id: string
    name?: string | MultilingualName
    [key: string]: unknown
}

export interface ServiceWithDetails {
    _id: string
    name?: string | MultilingualName
    [key: string]: unknown
}

export interface ProfessionService {
    _id: string
    service?: ServiceWithDetails
    subServices?: SubService[]
    [key: string]: unknown
}

export interface Profession {
    _id: string
    profession_services?: ProfessionService[]
    profileImage?: ProfileImage
    activationPeriod?: {
        durationMonths?: number
        activatedAt?: string
    }
    [key: string]: unknown
}

export interface User {
    _id: string
    name: string
    countryCode: string
    phoneNumber: string
    country: string
    role: number
    language: string
    email?: string
    verifiedAt?: string
    isOnline?: boolean
    lastSeen?: string
    lastActiveAt?: string
    professions?: Profession[]
    [key: string]: unknown
}

export interface Customer {
    _id: string
    name: string
    phoneNumber: string
    countryCode: string
    country: string
}
