import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LayoutDashboard, Image, List, Tag, Calendar, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Media', path: '/admin/media', icon: Image },
    { name: 'Programs', path: '/admin/programs', icon: List },
    { name: 'Offers', path: '/admin/offers', icon: Tag },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/50 z-40 md:hidden" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-white flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-xl font-display font-bold text-turquoise">Tiny Twirl</h2>
            <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Admin Portal</p>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={closeMobileMenu}>
            <X size={24} />
          </button>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-sm text-white/70">Welcome,</p>
          <p className="font-bold text-white truncate">{user?.name || 'Admin'}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.name}
              to={item.path} 
              onClick={closeMobileMenu}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-purple text-white font-medium' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              closeMobileMenu();
              logout();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-white/10 hover:text-red-300 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center z-30">
          <div className="flex items-center gap-3">
            <button onClick={toggleMobileMenu} className="text-charcoal hover:text-purple">
              <Menu size={24} />
            </button>
            <h2 className="font-display font-bold text-purple text-lg">Admin</h2>
          </div>
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
