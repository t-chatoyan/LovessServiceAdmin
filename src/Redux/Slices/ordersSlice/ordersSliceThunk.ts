import {createAsyncThunk} from '@reduxjs/toolkit'
import {instance} from '../../Config/axiosConfig'
import type {Customer} from '../../../types/sharedTypes.ts'

export interface Request {
    _id: string
    customer?: Customer
    fullName: string
    comment?: string
    service?: {
        _id: string
        name: string | { en: string; hy: string; ru: string }
    }
    problems?: Array<{
        _id: string
        title: string | { en: string; hy: string; ru: string }
    }>
    professionals?: Array<{
        _id: string
        professional?: {
            _id: string
            fullName: string
            phoneNumber: string
            countryCode: string
        }
        answer?: string
        comment?: string
        status?: string
    }>
    address?: string | { en: string; hy: string; ru: string }
    position?: {
        lat: number
        lng: number
    }
    notifyAll?: boolean
    files?: Array<{
        originalname: string
        filename: string
        mimetype: string
        size: number
        path: string
    }>
    createdAt: string
    updatedAt: string

    [key: string]: unknown
}

interface GetRequestsParams {
    page?: number
    limit?: number
    language?: string
    deviceId?: string
    sessionId?: string
}

export interface RequestsResponse {
    message: string
    requests: Request[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

export const getAllRequestsThunk = createAsyncThunk<
    RequestsResponse,
    GetRequestsParams | void,
    { rejectValue: string }
>(
    'admin/getAllRequests',
    async (params, {rejectWithValue}) => {
        try {
            const {
                page = 1,
                limit = 10,
                language = 'en',
                deviceId,
                sessionId,
            } = params || {}

            const headers: Record<string, string> = {
                'X-Language': language,
            }


            if (deviceId) {
                headers['X-Device-Id'] = deviceId
            } else if (sessionId) {
                headers['X-Session-Id'] = sessionId
            } else {

                const storedDeviceId = localStorage.getItem('deviceId')
                const storedSessionId = localStorage.getItem('sessionId')
                if (storedDeviceId) {
                    headers['X-Device-Id'] = storedDeviceId
                } else if (storedSessionId) {
                    headers['X-Session-Id'] = storedSessionId
                }

            }
            const response = await instance.get<RequestsResponse>('/admin/requests', {
                params: {
                    page,
                    limit,
                },
                headers,
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
                err.response?.data?.message || err.message || 'Failed to fetch requests'
            )
        }
    }
)

interface GetUserRequestsParams {
    userId: string
    page?: number
    limit?: number
}

export const getUserRequestsThunk = createAsyncThunk<
    RequestsResponse,
    GetUserRequestsParams,
    { rejectValue: string }
>(
    'admin/getUserRequests',
    async (params, {rejectWithValue}) => {
        try {
            const {
                userId,
                page = 1,
                limit = 10,
            } = params

            const language = localStorage.getItem('language') || 'en'

            const response = await instance.get<RequestsResponse>(
                `/admin/requests/user/${userId}`,
                {
                    params: {
                        page,
                        limit,
                    },
                    headers: {
                        'X-Language': language,
                    },
                }
            )

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
                err.response?.data?.message || err.message || 'Failed to fetch user requests'
            )
        }
    }
)
