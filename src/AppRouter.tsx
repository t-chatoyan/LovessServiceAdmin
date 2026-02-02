import { Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from './auth/demoAuth'
import RequireAuth from './auth/RequireAuth'
import SignInPage from './Pages/SignInPage/SignInPage'
import CategoriesPage from './Pages/CategoriesPage/CategoriesPage'
import UsersPage from './Pages/UsersPage/UsersPage'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
import AdminLayout from './Layouts/AdminLayout'
import OrdersPage from './Pages/OrdersPage/OrdersPage'
import RequestPage from './Pages/RequestPage/RequestPage'
import TariffsPage from './Pages/TariffsPage/TariffsPage'
import SpecialistApprovalPage from './Pages/SpecialistApprovalPage/SpecialistApprovalPage'
import ServicePage from './Pages/ServicePage/ServicePage'
import SubServicePage from './Pages/SubServicePage/SubServicePage'
import UserPage from './Pages/UsersPage/UserPage'
import NotificationsPage from './Pages/NotificationsPage/NotificationsPage'
import NotificationPage from './Pages/NotificationPage/NotificationPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route
        path="/signin"
        element={isAuthenticated() ? <Navigate to="/categories" replace /> : <SignInPage />}
      />
      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/service" element={<ServicePage />} />
        <Route path="/categories/service/subServices" element={<SubServicePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:requestId" element={<RequestPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notifications/:notificationId" element={<NotificationPage />} />
        <Route path="/tariffs" element={<TariffsPage />} />
        <Route path="/specialist-approval" element={<SpecialistApprovalPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter


