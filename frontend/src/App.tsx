import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from './hooks/redux'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import CashManagementPage from './pages/cash/CashManagementPage'
import ClientsPage from './pages/clients/ClientsPage'
import ContractsPage from './pages/contracts/ContractsPage'
import DebtsPage from './pages/debts/DebtsPage'
import ProfitAnalyticsPage from './pages/profit/ProfitAnalyticsPage'
import TeamPage from './pages/team/TeamPage'
import WarehousePage from './pages/warehouse/WarehousePage'
import SettingsPage from './pages/settings/SettingsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="cash" element={<CashManagementPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="contracts" element={<ContractsPage />} />
          <Route path="debts" element={<DebtsPage />} />
          <Route path="profit" element={<ProfitAnalyticsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="warehouse" element={<WarehousePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
