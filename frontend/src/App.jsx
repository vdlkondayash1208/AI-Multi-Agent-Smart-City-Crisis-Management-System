import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import CoordinatorDashboard from './pages/CoordinatorDashboard'
import ResponderDashboard from './pages/ResponderDashboard'
import CitizenPortal from './pages/CitizenPortal'
import Reports from './pages/Reports'
import AlertComposer from './pages/AlertComposer'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/dashboard';
    if (user.role === 'coordinator') return '/coordinator';
    if (user.role === 'responder') return '/responder';
    return '/login';
  };

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/citizen" element={<CitizenPortal />} />
      <Route path="/unauthorized" element={
        <div className="flex h-screen items-center justify-center bg-background text-foreground">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-destructive mb-2">Unauthorized</h1>
            <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
            <a href="/" className="text-primary hover:underline font-medium">Return to Home</a>
          </div>
        </div>
      } />
      
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to={getDefaultRoute()} replace />} />
        
        {/* Admin Routes */}
        <Route path="dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="reports" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <Reports />
          </ProtectedRoute>
        } />
        
        {/* Coordinator Routes */}
        <Route path="coordinator" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <CoordinatorDashboard />
          </ProtectedRoute>
        } />
        <Route path="alerts/new" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <AlertComposer />
          </ProtectedRoute>
        } />

        {/* Responder Routes */}
        <Route path="responder" element={
          <ProtectedRoute allowedRoles={['responder']}>
            <ResponderDashboard />
          </ProtectedRoute>
        } />
      </Route>
      
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
