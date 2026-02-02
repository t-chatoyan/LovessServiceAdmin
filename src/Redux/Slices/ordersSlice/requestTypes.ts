import type { User, ProfileImage } from '../../../types/sharedTypes.ts'

export type { User, ProfileImage }

export interface Professional {
    _id: string
    fullName: string
    phoneNumber?: string
    countryCode?: string
    user?: User
    profileImage?: ProfileImage
    [key: string]: unknown
}

export interface ProfessionalResponse {
    _id: string
    professional?: Professional
    answer?: string
    comment?: string
    status?: string
    [key: string]: unknown
}
