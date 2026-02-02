import { createSlice } from '@reduxjs/toolkit'
import { getAllUsersThunk, getUserByIdThunk } from './usersSliceThunk'
import type { User } from '../../../types/sharedTypes.ts'

interface UsersState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllUsersThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.users = payload
        state.error = null
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch users'
      })
      .addCase(getUserByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.selectedUser = payload
        state.error = null
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch user'
        state.selectedUser = null
      })
  },
})

export const { clearError } = usersSlice.actions
export default usersSlice.reducer

