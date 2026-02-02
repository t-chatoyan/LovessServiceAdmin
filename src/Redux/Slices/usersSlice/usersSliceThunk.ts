import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../Config/axiosConfig'
import type { User } from '../../../types/sharedTypes.ts'

export const getAllUsersThunk = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get<{ response: User[]}>('/users')
      return response.data.response || response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch users'
      )
    }
  }
)

interface GetUserByIdParams {
  id: string
  language?: string
}

export const getUserByIdThunk = createAsyncThunk<User, GetUserByIdParams, { rejectValue: string }>(
  'users/getUserById',
  async ({ id, language = 'en' }, { rejectWithValue }) => {
    try {
      const headers: Record<string, string> = {
        'X-Language': language,
      }
      const response = await instance.get<{ user: User }>(`/admin/users/${id}`, {
        headers,
      })
      
      if (!response.data?.user) {
        return rejectWithValue('User data not found in response')
      }
      
      return response.data.user
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
      } else if (err.response?.status === 404) {
        return rejectWithValue('User not found')
      }
      
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch user'
      )
    }
  }
)

