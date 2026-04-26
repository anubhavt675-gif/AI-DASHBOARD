import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectFilteredTasks, setFilter, addTask, resetFilters } from '../redux/slices/tasksSlice';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';

const TasksPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);
    const { filter } = useSelector(state => state.tasks);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', category: 'General' });

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return toast.error('Title is required');
        dispatch(addTask(newTask));
        setNewTask({ title: '', description: '', priority: 'medium', category: 'General' });
        setIsAddModalOpen(false);
        toast.success('Task added successfully!');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="page-title text-4xl">Tasks</h1>
                    <p className="text-dark-500 dark:text-dark-400 mt-1">Manage your professional and personal responsibilities.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary"
                >
                    <span className="text-xl">+</span> New Task
                </button>
            </div>

            {/* Filters Bar */}
            <div className="glass p-4 rounded-2xl flex flex-wrap items-center gap-4 border-white/10">
                <div className="flex-1 min-w-[200px] relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="input pl-10 py-2"
                        value={filter.search}
                        onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
                    />
                </div>
                <select
                    className="input py-2 w-auto"
                    value={filter.status}
                    onChange={(e) => dispatch(setFilter({ status: e.target.value }))}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    className="input py-2 w-auto"
                    value={filter.priority}
                    onChange={(e) => dispatch(setFilter({ priority: e.target.value }))}
                >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button
                    onClick={() => dispatch(resetFilters())}
                    className="btn-ghost text-sm"
                >
                    Reset
                </button>
            </div>

            {/* Tasks Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {tasks.length === 0 && (
                <div className="text-center py-20 bg-dark-50/50 dark:bg-dark-900/20 rounded-3xl border-2 border-dashed border-dark-200 dark:border-dark-800">
                    <span className="text-6xl mb-4 block">🏝️</span>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white">All clear!</h3>
                    <p className="text-dark-500">No tasks found matching your criteria.</p>
                </div>
            )}

            {/* Add Task Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-dark-900 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
                        >
                            <div className="p-6 border-b border-dark-100 dark:border-dark-800">
                                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Create New Task</h3>
                            </div>
                            <form onSubmit={handleAddTask} className="p-6 space-y-4">
                                <div>
                                    <label className="label">Title</label>
                                    <input
                                        type="text"
                                        className="input"
                                        autoFocus
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        placeholder="What needs to be done?"
                                    />
                                </div>
                                <div>
                                    <label className="label">Description</label>
                                    <textarea
                                        className="input min-h-[100px] resize-none"
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        placeholder="Add some details..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Priority</label>
                                        <select
                                            className="input"
                                            value={newTask.priority}
                                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">Category</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={newTask.category}
                                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                            placeholder="e.g. Work, Home"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="btn-secondary flex-1 justify-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary flex-1 justify-center"
                                    >
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TasksPage;
