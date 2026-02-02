import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../Config/axiosConfig'

interface Category {
  id: string
  name: {
    hy?: string
    [key: string]: string | undefined
  }
  [key: string]: unknown
}

export const getCategoriesThunk = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get<Category[]>('/service-category')
      return response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch categories'
      )
    }
  }
)

export const getCategoryByIdThunk = createAsyncThunk<Category, string, { rejectValue: string }>(
  'categories/getCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get<Category>(`/service-category/${id}`)
      return response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch category'
      )
    }
  }
)

