import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/auth/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { News } from './components/dashboard/News';
import { Grades } from './components/dashboard/Grades';
import { Schedule } from './components/dashboard/Schedule';
import { Attendance } from './components/dashboard/Attendance';
import { Messages } from './components/dashboard/Messages';
import { Profile } from './components/dashboard/Profile';
import { Settings } from './components/dashboard/Settings';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <News />,
      },
      {
        path: 'grades',
        element: <Grades />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);