import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import '../src/styles/globals.css'

// Site público — INTOCADO
import App from './app/App'

// Admin — novos arquivos
import { AdminApp } from './admin/AdminApp'
import { Login } from './admin/pages/Login'
import { ProtectedRoute } from './admin/components/ProtectedRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* ── Site público ──────────────────────────────── */}
        <Route path="/" element={<App />} />

        {/* ── Admin: login (sem proteção) ───────────────── */}
        <Route path="/admin/login" element={<Login />} />

        {/* ── Admin: painel (protegido) ─────────────────── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminApp />
            </ProtectedRoute>
          }
        />

        {/* ── Rota /admin/* futura (Fases 3 e 4) ──────── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminApp />
            </ProtectedRoute>
          }
        />

        {/* ── Qualquer rota desconhecida → home ─────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)