import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Newspaper
} from 'lucide-react';

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentName = localStorage.getItem('studentName') || 'Student';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentName');
    window.location.href = '/login';
  };

  const menuItems = [
    { icon: Newspaper, label: 'Aktualności', path: '/dashboard' },
    { icon: BookOpen, label: 'Oceny', path: '/dashboard/grades' },
    { icon: Calendar, label: 'Plan zajęć', path: '/dashboard/schedule' },
    { icon: UserCheck, label: 'Obecności', path: '/dashboard/attendance' },
    { icon: Mail, label: 'Wiadomości', path: '/dashboard/messages' },
    { icon: User, label: 'Mój profil', path: '/dashboard/profile' },
    { icon: Settings, label: 'Ustawienia', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navbar */}
      <nav className="bg-slate-800 border-b border-slate-700 fixed w-full top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-200"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:block">
                Dziennik Studenta
              </span>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-200">{studentName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors border border-red-600/30"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Wyloguj</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-800 border-r border-slate-700 z-20 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = item.path === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}