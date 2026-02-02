import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../Config/axiosConfig'

export interface Notification {
  _id: string
  user?: {
    _id: string
    name: string
    phoneNumber?: string
    countryCode?: string
  }
  body?: string
  description?: string
  type?: string
  isRead?: boolean
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

interface GetNotificationsParams {
  page?: number
  limit?: number
}

export interface NotificationsResponse {
  notifications: Notification[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const getNotificationsThunk = createAsyncThunk<
  NotificationsResponse,
  GetNotificationsParams | void,
  { rejectValue: string }
>(
  'admin/getNotifications',
  async (params, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        limit = 10,
      } = params || {}

      const response = await instance.get<NotificationsResponse>('/admin/notifications', {
        params: {
          page,
          limit,
        },
      })

      return response.data
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status?: number
          data?: { message?: string }
        }
        message?: string
      }

      if (err.response?.status === 401) {
        return rejectWithValue('Unauthorized - Please login again')
      } else if (err.response?.status === 403) {
        return rejectWithValue('Forbidden - Admin access required')
      }

      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch notifications'
      )
    }
  }
)
