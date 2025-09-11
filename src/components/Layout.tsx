import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
                                                        
  const navItems = [
    { path: '/app/dashboard', label: 'Analytics', icon: '📊' },
    { path: '/app/recordings', label: 'Recordings', icon: '🎙️' },
    { path: '/app/billings', label: 'Billings', icon: '💳' },
    { path: '/app/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg h-screen fixed left-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">SynaptiVoice</h1>
        </div>
        <div className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                isActive(item.path) 
                  ? 'bg-gray-100 text-gray-900 border-r-4 border-gray-900' 
                  : ''
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="mb-2 text-sm text-gray-600">Welcome, {user?.username}</div>
          <Button 
            onClick={logout} 
            variant="secondary"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
