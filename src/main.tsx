import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import App from './app/App'
import { AdminApp } from './admin/AdminApp'
import { Login } from './admin/pages/Login'
import { ProtectedRoute } from './admin/components/ProtectedRoute'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>

      {/* Site público */}
      <Route path="/*" element={<App />} />

      {/* Login Admin */}
      <Route
        path="/admin/login"
        element={<Login />}
      />

      {/* Painel protegido */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminApp />
          </ProtectedRoute>
        }
      />

    </Routes>
  </BrowserRouter>
)