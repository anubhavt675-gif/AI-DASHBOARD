import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, clearError } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [email, setEmail] = useState('admin@nexus.ai');
    const [password, setPassword] = useState('admin123');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-mesh py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8"
            >
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow mb-6">
                        <span className="text-white font-bold text-2xl font-display">N</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-dark-900 dark:text-white font-display">
                        Welcome to <span className="text-gradient">Nexus AI</span>
                    </h2>
                    <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">
                        The intelligent workspace for modern professionals.
                    </p>
                </div>

                <div className="glass-strong p-8 rounded-3xl shadow-glow-lg border-white/20">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                required
                                className="input"
                                placeholder="name@nexus.ai"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                required
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                                <span className="ml-2 text-sm text-dark-600 dark:text-dark-400">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center py-3 text-lg"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Sign in →'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-dark-100 dark:border-dark-700/50 text-center">
                        <p className="text-sm text-dark-500">
                            Don't have an account? <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">Get started free</a>
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-dark-400 opacity-60 uppercase tracking-widest font-semibold mt-4">
                        Demo Credentials: admin@nexus.ai / admin123
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
