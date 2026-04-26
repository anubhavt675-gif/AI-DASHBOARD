import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectTaskStats } from '../redux/slices/tasksSlice';
import ClockWidget from '../components/widgets/ClockWidget';
import TaskCard from '../components/TaskCard';
import NoteCard from '../components/NoteCard';

const DashboardPage = () => {
    const { user } = useSelector(state => state.auth);
    const { items: tasks } = useSelector(state => state.tasks);
    const { items: notes } = useSelector(state => state.notes);
    const stats = useSelector(selectTaskStats);

    const recentTasks = tasks.slice(0, 3);
    const pinnedNotes = notes.filter(n => n.pinned).slice(0, 2);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="page-title text-4xl">Dashboard</h1>
                    <p className="text-dark-500 dark:text-dark-400 mt-1">
                        Welcome back, {user?.name.split(' ')[0]}! Here's what's happening today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary">
                        📊 Export Report
                    </button>
                    <button className="btn-primary">
                        ✨ Generate AI Insights
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <div className="stat-card">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-6xl">📝</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-500 uppercase tracking-wider">Total Tasks</p>
                    <h3 className="text-3xl font-bold text-dark-900 dark:text-white mt-1">{stats.total}</h3>
                    <p className="text-xs text-dark-400 mt-2 flex items-center gap-1">
                        <span className="text-success-500">↑ 12%</span> from last week
                    </p>
                </div>
                <div className="stat-card">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-6xl">✅</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-500 uppercase tracking-wider">Completed</p>
                    <h3 className="text-3xl font-bold text-dark-900 dark:text-white mt-1">{stats.completed}</h3>
                    <div className="w-full bg-dark-100 dark:bg-dark-700 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div
                            className="bg-primary-500 h-full transition-all duration-1000"
                            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-6xl">🔥</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-500 uppercase tracking-wider">Critical Tasks</p>
                    <h3 className="text-3xl font-bold text-danger mt-1">{stats.highPriority}</h3>
                    <p className="text-xs text-danger opacity-70 mt-2 font-medium">Attention needed immediately</p>
                </div>
                <div className="stat-card">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-6xl">🎯</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-500 uppercase tracking-wider">Goal Progress</p>
                    <h3 className="text-3xl font-bold text-dark-900 dark:text-white mt-1">84%</h3>
                    <p className="text-xs text-dark-400 mt-2">On track for Q2 targets</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Tasks */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="section-title">Upcoming Tasks</h2>
                            <button className="text-sm font-semibold text-primary-600 hover:underline">View all</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {recentTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>

                    {/* Quick AI Suggestion */}
                    <div className="ai-suggestion">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white text-xl animate-pulse-slow">
                            ✨
                        </div>
                        <div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100 text-sm">Nexus AI Tip</h4>
                            <p className="text-sm text-primary-700 dark:text-primary-300 mt-1 leading-relaxed">
                                You have 3 tasks due tomorrow that are related to "Project X". Consider time-blocking your morning for focused work.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-8">
                    <ClockWidget />

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="section-title">Pinned Notes</h2>
                            <button className="text-sm font-semibold text-primary-600 hover:underline">All notes</button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {pinnedNotes.map(note => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                            {pinnedNotes.length === 0 && (
                                <div className="card text-center py-8">
                                    <p className="text-sm text-dark-400 italic">No pinned notes yet</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
