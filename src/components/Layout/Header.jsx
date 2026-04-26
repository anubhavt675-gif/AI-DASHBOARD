import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { toggleSidebar } from '../../redux/slices/uiSlice';
import { logout } from '../../redux/slices/authSlice';

const routeTitles = {
  '/dashboard': { title: 'Dashboard', emoji: '🏠' },
  '/tasks': { title: 'Task Manager', emoji: '✅' },
  '/notes': { title: 'Notes', emoji: '📝' },
  '/calendar': { title: 'Calendar', emoji: '📅' },
  '/widgets': { title: 'Widgets', emoji: '🌦️' },
  '/settings': { title: 'Settings', emoji: '⚙️' },
};

const Header = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mode } = useSelector(state => state.theme);
  const { user } = useSelector(state => state.auth);
  const { items: tasks } = useSelector(state => state.tasks);

  const route = routeTitles[pathname] || { title: 'Nexus AI', emoji: '✨' };
  const pendingHigh = tasks.filter(t => t.priority === 'high' && t.status === 'pending').length;
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <header className="h-16 bg-white dark:bg-dark-900 border-b border-dark-100 dark:border-dark-800 flex items-center px-6 gap-4 z-10">
      {/* Mobile menu button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="md:hidden p-2 rounded-xl text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">{route.emoji}</span>
          <div>
            <h2 className="font-bold text-dark-900 dark:text-white font-display leading-none">
              {route.title}
            </h2>
            <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">
              {greeting}, {user?.name?.split(' ')[0]}! 👋
            </p>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Alert badge */}
        {pendingHigh > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
          >
            🔥 {pendingHigh} urgent
          </motion.button>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 dark:text-dark-400 transition-all"
          title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {mode === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* User avatar */}
        <div className="relative group">
          <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.avatar || '?'}
          </button>
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 rounded-2xl shadow-card-hover border border-dark-100 dark:border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
            <div className="px-3 py-2 border-b border-dark-100 dark:border-dark-700 mb-1">
              <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-full text-left px-3 py-2 text-sm text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-xl transition-all"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
