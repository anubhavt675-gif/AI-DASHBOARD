import { motion } from 'framer-motion';
import ClockWidget from '../components/widgets/ClockWidget';

const WidgetsPage = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="page-title text-4xl">Widgets</h1>
                    <p className="text-dark-500 dark:text-dark-400 mt-1">Customize your workspace with floating utilities.</p>
                </div>
                <button className="btn-primary">
                    + Add New Widget
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <ClockWidget />
                </motion.div>

                {/* Weather Widget Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card flex flex-col justify-between"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                            <span className="text-sm">☀️</span>
                        </div>
                        <h3 className="section-title">Weather</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-5xl font-bold text-dark-900 dark:text-white">24°C</span>
                            <p className="text-dark-500 text-sm mt-1">Sunny • New York, NY</p>
                        </div>
                        <div className="text-4xl">☀️</div>
                    </div>
                    <div className="mt-6 flex justify-between text-xs text-dark-400 font-medium">
                        <div className="text-center"><p>MON</p><p className="text-dark-900 dark:text-white mt-1">22°</p></div>
                        <div className="text-center"><p>TUE</p><p className="text-dark-900 dark:text-white mt-1">25°</p></div>
                        <div className="text-center"><p>WED</p><p className="text-dark-900 dark:text-white mt-1">24°</p></div>
                        <div className="text-center"><p>THU</p><p className="text-dark-900 dark:text-white mt-1">21°</p></div>
                        <div className="text-center"><p>FRI</p><p className="text-dark-900 dark:text-white mt-1">23°</p></div>
                    </div>
                </motion.div>

                {/* AI Productivity Widget */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="card bg-gradient-to-br from-primary-600 to-indigo-700 text-white border-none shadow-glow-lg"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <span className="text-sm">✨</span>
                        </div>
                        <h3 className="text-lg font-semibold">Nexus AI Insights</h3>
                    </div>
                    <p className="text-sm text-primary-50 leading-relaxed font-medium">
                        "Your productivity peaked at 10:30 AM yesterday. We recommend scheduling your high-focus tasks during that window today."
                    </p>
                    <button className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-all">
                        View Detailed Analytics
                    </button>
                </motion.div>
            </div>

            <div className="text-center py-12">
                <p className="text-dark-400 text-sm font-medium">More widgets coming soon: Calculator, Unit Converter, Stocks, and more.</p>
            </div>
        </div>
    );
};

export default WidgetsPage;
