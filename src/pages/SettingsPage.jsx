import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleTheme, setTheme } from '../redux/slices/themeSlice';
import { updateUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const SettingsPage = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector(state => state.theme);
    const { user } = useSelector(state => state.auth);

    const handleUpdateName = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        dispatch(updateUser({ name }));
        toast.success('Profile updated!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="page-title text-4xl">Settings</h1>
                <p className="text-dark-500 dark:text-dark-400 mt-1">Manage your account and app preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-lg font-bold text-dark-900 dark:text-white">Profile Information</h2>
                    <p className="text-sm text-dark-500 mt-1">Update your personal details and how others see you.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="card">
                        <form onSubmit={handleUpdateName} className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    {user?.avatar}
                                </div>
                                <button type="button" className="text-sm font-bold text-primary-600 hover:underline">Change Avatar</button>
                            </div>
                            <div>
                                <label className="label">Full Name</label>
                                <input name="name" type="text" className="input" defaultValue={user?.name} />
                            </div>
                            <div>
                                <label className="label">Email Address</label>
                                <input type="email" className="input opacity-50 cursor-not-allowed" value={user?.email} disabled />
                                <p className="text-[10px] text-dark-400 mt-1">Email cannot be changed in the demo version.</p>
                            </div>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-1 pt-8 md:pt-0">
                    <h2 className="text-lg font-bold text-dark-900 dark:text-white">Appearance</h2>
                    <p className="text-sm text-dark-500 mt-1">Customize the visual style of the application.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-dark-900 dark:text-white">Dark Mode</p>
                                <p className="text-sm text-dark-500">Enable a darker surface for the app.</p>
                            </div>
                            <button 
                                onClick={() => dispatch(toggleTheme())}
                                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ${mode === 'dark' ? 'bg-primary-600' : 'bg-dark-200'}`}
                            >
                                <motion.div 
                                    className="w-6 h-6 bg-white rounded-full shadow-md"
                                    animate={{ x: mode === 'dark' ? 24 : 0 }}
                                />
                            </button>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {['light', 'dark', 'system'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => t !== 'system' && dispatch(setTheme(t))}
                                    className={`p-4 rounded-2xl border-2 transition-all capitalize text-sm font-bold ${
                                        (mode === t || (t === 'system' && false)) 
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                                        : 'border-dark-100 dark:border-dark-800 text-dark-500'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 pt-8 md:pt-0">
                    <h2 className="text-lg font-bold text-danger">Safety & Security</h2>
                    <p className="text-sm text-dark-500 mt-1">Manage your password and session settings.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="card border-danger/20">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-dark-900 dark:text-white">Password</p>
                                    <p className="text-sm text-dark-500">Last changed 3 months ago.</p>
                                </div>
                                <button className="btn-secondary text-sm px-4">Update</button>
                            </div>
                            <hr className="border-dark-100 dark:border-dark-800" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-danger">Delete Account</p>
                                    <p className="text-sm text-dark-500">Permanently remove all your data.</p>
                                </div>
                                <button className="btn-ghost text-danger hover:bg-danger/5 text-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
