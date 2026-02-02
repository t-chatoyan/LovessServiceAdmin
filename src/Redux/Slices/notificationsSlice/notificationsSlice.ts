import { createSlice } from '@reduxjs/toolkit'
import { getNotificationsThunk, type Notification } from './notificationsSliceThunk'

interface NotificationsState {
  notifications: Notification[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  loading: boolean
  error: string | null
}

const initialState: NotificationsState = {
  notifications: [],
  pagination: null,
  loading: false,
  error: null,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload.notifications
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(getNotificationsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch notifications'
      })
  },
})

export const { clearError } = notificationsSlice.actions
export default notificationsSlice.reducer
