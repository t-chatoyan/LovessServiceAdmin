import { createSlice } from '@reduxjs/toolkit'
import { getCategoriesThunk, getCategoryByIdThunk } from './categoriesSliceThunk'

interface Category {
  id: string
  name: {
    hy?: string
    [key: string]: string | undefined
  }
  [key: string]: unknown
}

interface CategoriesState {
  categories: Category[]
  selectedCategory: Category | null
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.categories = payload
        state.error = null
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch categories'
      })
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategoryByIdThunk.fulfilled, (state, { payload }) => {
        state.loading = false
        state.selectedCategory = payload
        state.error = null
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch category'
      })
  },
})

export const { clearSelectedCategory, clearError } = categoriesSlice.actions
export default categoriesSlice.reducer

