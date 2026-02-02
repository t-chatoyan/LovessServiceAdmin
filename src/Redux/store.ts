import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './Slices/categoriesSlice/categoriesSlice'
import serviceSlice from './Slices/serviceSlice/serviceSlice'
import usersSlice from './Slices/usersSlice/usersSlice'
import ordersSlice from './Slices/ordersSlice/ordersSlice'
import notificationsSlice from './Slices/notificationsSlice/notificationsSlice'

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    services: serviceSlice,
    users: usersSlice,
    orders: ordersSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

