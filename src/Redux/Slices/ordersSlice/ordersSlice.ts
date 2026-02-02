import { createSlice } from '@reduxjs/toolkit'
import { getAllRequestsThunk, getUserRequestsThunk, type Request } from './ordersSliceThunk'

interface OrdersState {
  requests: Request[]
  userRequests: Request[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  userRequestsPagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  loading: boolean
  userRequestsLoading: boolean
  error: string | null
}

const initialState: OrdersState = {
  requests: [],
  userRequests: [],
  pagination: null,
  userRequestsPagination: null,
  loading: false,
  userRequestsLoading: false,
  error: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearUserRequests: (state) => {
      state.userRequests = []
      state.userRequestsPagination = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequestsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllRequestsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.requests = action.payload.requests
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(getAllRequestsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch requests'
      })
      .addCase(getUserRequestsThunk.pending, (state) => {
        state.userRequestsLoading = true
        state.error = null
      })
      .addCase(getUserRequestsThunk.fulfilled, (state, action) => {
        state.userRequestsLoading = false
        state.userRequests = action.payload.requests
        state.userRequestsPagination = action.payload.pagination
        state.error = null
      })
      .addCase(getUserRequestsThunk.rejected, (state, action) => {
        state.userRequestsLoading = false
        state.error = action.payload || 'Failed to fetch user requests'
        state.userRequests = []
      })
  },
})

export const { clearError, clearUserRequests } = ordersSlice.actions
export default ordersSlice.reducer
