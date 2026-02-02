import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../Config/axiosConfig'
import type { ServiceApi } from '../../../types/sharedTypes.ts'

type Service = ServiceApi

export const getServicesThunk = createAsyncThunk<Service[], void, { rejectValue: string }>(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get<{ response: Service[] }>('/service')
      return response.data.response || response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch services'
      )
    }
  }
)

export const getServiceByIdThunk = createAsyncThunk<Service, string, { rejectValue: string }>(
  'services/getServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get<{ response: Service }>(`/service/${id}`)
      return response.data.response || response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch service'
      )
    }
  }
)

export const filterServicesByCategoryThunk = createAsyncThunk<
  Service[],
  { categoryId: string; search?: string },
  { rejectValue: string }
>(
  'services/filterByCategory',
  async ({ categoryId, search }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ category: categoryId })
      if (search) {
        params.append('search', search)
      }
      const response = await instance.get<{ response: Service[] }>(`/service/filter/by-category?${params.toString()}`)
      return response.data.response || response.data
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to filter services by category'
      )
    }
  }
)

