import { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import { setSidebarOpen } from '../../redux/slices/uiSlice';

const navItems = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/tasks', icon: '✅', label: 'Tasks' },
  { to: '/notes', icon: '📝', label: 'Notes' },
  { to: '/calendar', icon: '📅', label: 'Calendar' },
  { to: '/widgets', icon: '🌦️', label: 'Widgets' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

const MobileSidebar = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarOpen } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.auth);

  const close = () => dispatch(setSidebarOpen(false));

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="md:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-dark-900 z-40 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-dark-100 dark:border-dark-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <h1 className="font-bold text-dark-900 dark:text-white font-display text-lg leading-none">Nexus AI</h1>
                  <p className="text-xs text-dark-400">Productivity Hub</p>
                </div>
              </div>
              <button onClick={close} className="p-2 rounded-xl text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                    ${isActive ? 'bg-primary-600 text-white' : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800'}
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-dark-100 dark:border-dark-800 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-dark-400 capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={() => { dispatch(logout()); navigate('/login'); close(); }}
                className="btn-danger w-full justify-center text-sm py-2"
              >
                🚪 Sign Out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

MobileSidebar.displayName = 'MobileSidebar';
export default MobileSidebar;
