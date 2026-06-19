import { ImagesEditor } from './pages/editors/ImagesEditor'
import { useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router'
import { supabase } from '../lib/supabase'
import { Dashboard } from './pages/Dashboard'
import { SiteSettingsEditor } from './pages/editors/SiteSettingsEditor'

import { HeroEditor } from './pages/editors/HeroEditor'
import { ContactEditor } from './pages/editors/ContactEditor'
import { ServicesEditor } from './pages/editors/ServicesEditor'
import { DestinationsEditor } from './pages/editors/DestinationsEditor'
import { TestimonialsEditor } from './pages/editors/TestimonialsEditor'
import { FaqEditor } from './pages/editors/FaqEditor'
import { AboutEditor } from './pages/editors/AboutEditor'
import { AboutTimelineEditor } from './pages/editors/AboutTimelineEditor'
import { FooterEditor } from './pages/editors/FooterEditor'
import { SectionsEditor } from './pages/editors/SectionsEditor'
import { NavLinksEditor } from './pages/editors/NavLinksEditor'
import { HowItWorksEditor } from './pages/editors/HowItWorksEditor'

import {
  LayoutDashboard,
  LogOut,
  PawPrint,
  Menu,
  X,
} from 'lucide-react'

export function AdminApp() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
  localStorage.removeItem('admin-auth')
  navigate('/admin/login')
}

  const navItems = [
    {
  icon: LayoutDashboard,
  label: 'Configurações',
  path: '/admin/settings',
},
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },

  { icon: LayoutDashboard, label: 'Hero', path: '/admin/hero' },

  { icon: LayoutDashboard, label: 'Contato', path: '/admin/contact' },

  { icon: LayoutDashboard, label: 'Serviços', path: '/admin/services' },

  { icon: LayoutDashboard, label: 'Destinos', path: '/admin/destinations' },

  { icon: LayoutDashboard, label: 'Depoimentos', path: '/admin/testimonials' },

  { icon: LayoutDashboard, label: 'FAQ', path: '/admin/faq' },

  { icon: LayoutDashboard, label: 'Sobre', path: '/admin/about' },

  { icon: LayoutDashboard, label: 'Rodapé', path: '/admin/footer' },

  { icon: LayoutDashboard, label: 'Como Funciona', path: '/admin/how-it-works' },
  { icon: LayoutDashboard, label: 'Seções', path: '/admin/sections' },
  { icon: LayoutDashboard, label: 'Navegação', path: '/admin/nav-links' },
]

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8F7F5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? '240px' : '0px',
          minWidth: sidebarOpen ? '240px' : '0px',
          background: 'white',
          borderRight: '1px solid rgba(28,25,23,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          boxShadow: '2px 0 12px rgba(28,25,23,0.04)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '1.25rem 1.25rem 1rem',
            borderBottom: '1px solid rgba(28,25,23,0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #C4622D, #A04E22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PawPrint size={18} color="white" strokeWidth={2} />
          </div>

          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontWeight: 700,
                color: '#1C1917',
                fontSize: '0.875rem',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Isadora Lima
            </p>

            <p
              style={{
                color: '#C4622D',
                fontSize: '0.6875rem',
                margin: 0,
                fontWeight: 500,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              PAINEL ADMIN
            </p>
          </div>
        </div>

        {/* Navegação */}
        <nav style={{ flex: 1, padding: '0.75rem' }}>
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.75rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(196,98,45,0.08)',
                color: '#C4622D',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: '0.75rem',
            borderTop: '1px solid rgba(28,25,23,0.07)',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '10px',
              border: '1px solid rgba(220,38,38,0.15)',
              background: 'rgba(220,38,38,0.05)',
              color: '#DC2626',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} />
            Sair do painel
          </button>
        </div>
      </aside>

      {/* Área principal */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <header
          style={{
            height: '60px',
            background: 'white',
            borderBottom: '1px solid rgba(28,25,23,0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1.5rem',
            gap: '1rem',
            boxShadow: '0 1px 8px rgba(28,25,23,0.04)',
          }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              border: '1px solid rgba(28,25,23,0.10)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#78716C',
            }}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <span
            style={{
              fontSize: '0.875rem',
              color: '#A8A29E',
              flex: 1,
            }}
          >
            Painel de Administração
          </span>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8125rem',
              color: '#C4622D',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.375rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(196,98,45,0.08)',
              whiteSpace: 'nowrap',
            }}
          >
            Ver site →
          </a>
        </header>

        {/* Conteúdo */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
        <Routes>
          <Route
  path="settings"
  element={<SiteSettingsEditor />}
/>
  <Route index element={<Dashboard />} />

  <Route path="hero" element={<HeroEditor />} />

  <Route path="contact" element={<ContactEditor />} />

  <Route path="services" element={<ServicesEditor />} />

  <Route path="destinations" element={<DestinationsEditor />} />

  <Route path="testimonials" element={<TestimonialsEditor />} />

  <Route path="faq" element={<FaqEditor />} />

  <Route path="about" element={<AboutEditor />} />

  <Route path="footer" element={<FooterEditor />} />

  <Route path="how-it-works" element={<HowItWorksEditor />} />
  <Route path="sections" element={<SectionsEditor />} />
  <Route path="nav-links" element={<NavLinksEditor />} />
</Routes>
        </main>
      </div>
    </div>
  )
}