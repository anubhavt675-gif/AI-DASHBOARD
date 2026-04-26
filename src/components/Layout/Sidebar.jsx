import { memo, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import { toggleSidebarCollapse } from '../../redux/slices/uiSlice';

const navItems = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/tasks', icon: '✅', label: 'Tasks' },
  { to: '/notes', icon: '📝', label: 'Notes' },
  { to: '/calendar', icon: '📅', label: 'Calendar' },
  { to: '/widgets', icon: '🌦️', label: 'Widgets' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

const Sidebar = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { sidebarCollapsed } = useSelector(state => state.ui);
  const { items: tasks } = useSelector(state => state.tasks);

  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col h-screen bg-white dark:bg-dark-900 border-r border-dark-100 dark:border-dark-800 relative z-20"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-dark-100 dark:border-dark-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-glow">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-bold text-dark-900 dark:text-white font-display text-lg leading-none">
                Nexus AI
              </h1>
              <p className="text-xs text-dark-400 dark:text-dark-500">Productivity Hub</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 relative group
              ${isActive
                ? 'bg-primary-600 text-white shadow-glow'
                : 'text-dark-500 dark:text-dark-400 hover:bg-dark-50 hover:text-dark-900 dark:hover:bg-dark-800 dark:hover:text-white'
              }
            `}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm flex-1"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Badge for tasks */}
            {item.to === '/tasks' && pendingCount > 0 && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white flex-shrink-0 ${sidebarCollapsed ? 'absolute -top-1 -right-1' : ''}`}>
                {pendingCount > 99 ? '99+' : pendingCount}
              </span>
            )}

            {/* Tooltip when collapsed */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-dark-900 dark:bg-dark-700 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-dark-100 dark:border-dark-800 p-3">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md text-white font-bold text-sm">
            {user?.avatar || '?'}
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-dark-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-dark-400 dark:text-dark-500 truncate capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleLogout}
                className="p-1.5 text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                title="Logout"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => dispatch(toggleSidebarCollapse())}
          className="w-full mt-2 flex items-center justify-center py-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800 rounded-xl transition-all"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </motion.aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
