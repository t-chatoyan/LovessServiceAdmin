import { createSlice } from '@reduxjs/toolkit'
import { getServicesThunk, getServiceByIdThunk, filterServicesByCategoryThunk } from './serviceSliceThunk'
import type { ServiceApi } from '../../../types/sharedTypes.ts'

type Service = ServiceApi

interface ServicesState {
  services: Service[]
  selectedService: Service | null
  loading: boolean
  error: string | null
}

const initialState: ServicesState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
}

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearSelectedService: (state) => {
      state.selectedService = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServicesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getServicesThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.services = payload
        state.error = null
      })
      .addCase(getServicesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch services'
      })
      .addCase(getServiceByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getServiceByIdThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.selectedService = payload
        state.error = null
      })
      .addCase(getServiceByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch service'
      })
      .addCase(filterServicesByCategoryThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(filterServicesByCategoryThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.services = payload
        state.error = null
      })
      .addCase(filterServicesByCategoryThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to filter services by category'
      })
  },
})

export const { clearSelectedService, clearError } = serviceSlice.actions
export default serviceSlice.reducer

