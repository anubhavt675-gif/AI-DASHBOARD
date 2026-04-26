import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

// Lazy-load pages
const LoginPage      = lazy(() => import('./pages/LoginPage'));
const DashboardPage  = lazy(() => import('./pages/DashboardPage'));
const TasksPage      = lazy(() => import('./pages/TasksPage'));
const NotesPage      = lazy(() => import('./pages/NotesPage'));
const CalendarPage   = lazy(() => import('./pages/CalendarPage'));
const WidgetsPage    = lazy(() => import('./pages/WidgetsPage'));
const SettingsPage   = lazy(() => import('./pages/SettingsPage'));

function App() {
  const { mode } = useSelector(state => state.theme);

  // Keep dark class in sync with Redux state
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Initializing Nexus AI..." />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="widgets" element={<WidgetsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
