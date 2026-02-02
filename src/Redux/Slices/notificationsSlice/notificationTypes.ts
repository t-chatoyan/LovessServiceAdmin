import type { Notification } from './notificationsSliceThunk'
import type { MultilingualName, Service, Customer } from '../../../types/sharedTypes.ts'

export type { MultilingualName, Service, Customer }

export interface NotificationRequest {
    _id?: string
    fullName?: string
    customer?: Customer
    service?: Service
    [key: string]: unknown
}

export interface NotificationWithRequest extends Notification {
    request?: NotificationRequest
    title?: string
}
