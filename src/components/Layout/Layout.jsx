import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileSidebar from './MobileSidebar';

const Layout = ({ children }) => {
  const { sidebarOpen } = useSelector(state => state.ui);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-50 dark:bg-dark-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-mesh">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
