import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../../lib/supabase'
import { PawPrint } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  if (
    email === 'limarodasi@outlook.com' &&
    password === 'admin'
  ) {
    localStorage.setItem('admin-auth', 'true')
    navigate('/admin')
    return
  }

  setError('Email ou senha incorretos.')
}

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F0EB 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #C4622D, #A04E22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 20px rgba(196,98,45,0.35)',
          }}>
            <PawPrint size={26} color="white" strokeWidth={2} />
          </div>
          <h1 style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1C1917',
            margin: 0,
            lineHeight: 1.2,
          }}>
            Painel Admin
          </h1>
          <p style={{
            color: '#78716C',
            fontSize: '0.875rem',
            marginTop: '0.375rem',
          }}>
            Isadora Lima · Pet Travel
          </p>
        </div>

        {/* Card do formulário */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 32px rgba(28,25,23,0.08)',
          border: '1px solid rgba(196,98,45,0.10)',
        }}>
          <form onSubmit={handleLogin}>

            {/* Campo email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1C1917',
                marginBottom: '0.5rem',
              }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(28,25,23,0.15)',
                  fontSize: '0.9375rem',
                  color: '#1C1917',
                  outline: 'none',
                  background: '#FAFAF9',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = '#C4622D')}
                onBlur={e => (e.target.style.borderColor = 'rgba(28,25,23,0.15)')}
              />
            </div>

            {/* Campo senha */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1C1917',
                marginBottom: '0.5rem',
              }}>
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(28,25,23,0.15)',
                  fontSize: '0.9375rem',
                  color: '#1C1917',
                  outline: 'none',
                  background: '#FAFAF9',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = '#C4622D')}
                onBlur={e => (e.target.style.borderColor = 'rgba(28,25,23,0.15)')}
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div style={{
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.20)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.875rem',
                color: '#DC2626',
              }}>
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '12px',
                border: 'none',
                background: loading
                  ? 'rgba(196,98,45,0.5)'
                  : 'linear-gradient(135deg, #C4622D, #A04E22)',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(196,98,45,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar no painel'}
            </button>

          </form>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.8125rem',
          color: '#A8A29E',
        }}>
          Acesso restrito · Isadora Lima Pet Travel
        </p>
      </div>
    </div>
  )
}