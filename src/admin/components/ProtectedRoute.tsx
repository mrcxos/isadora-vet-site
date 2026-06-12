import { Navigate } from 'react-router'

type Props = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const isLoggedIn =
    localStorage.getItem('admin-auth') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}