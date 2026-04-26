import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleTaskStatus, deleteTask } from '../redux/slices/tasksSlice';
import { getPriorityConfig, getStatusConfig, getDueDateStatus, formatDate, truncate } from '../utils/helpers';

const TaskCard = memo(({ task, onEdit, compact = false }) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTaskStatus(task.id));
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  }, [dispatch, task.id]);

  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const isCompleted = task.status === 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`card group hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${isCompleted ? 'opacity-70' : ''}`}
    >
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl`} style={{ backgroundColor: priorityConfig.color }} />

      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-primary-600 border-primary-600'
              : 'border-dark-300 hover:border-primary-500 dark:border-dark-500'
          }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-dark-900 dark:text-white text-sm leading-snug ${isCompleted ? 'line-through text-dark-400 dark:text-dark-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-dark-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                title="Edit task"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                title="Delete task"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {!compact && task.description && (
            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1 leading-relaxed">
              {truncate(task.description, 80)}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-1.5 mt-2">
            <span className={priorityConfig.className}>{priorityConfig.label}</span>
            <span className={statusConfig.className}>{statusConfig.label}</span>
            {task.category && (
              <span className="badge bg-dark-100 text-dark-600 dark:bg-dark-700 dark:text-dark-400">
                {task.category}
              </span>
            )}
          </div>

          {task.dueDate && dueDateStatus && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              dueDateStatus.color === 'danger' ? 'text-red-500' :
              dueDateStatus.color === 'warning' ? 'text-amber-500' :
              dueDateStatus.color === 'info' ? 'text-blue-500' : 'text-dark-400 dark:text-dark-500'
            }`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDateStatus.label}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

TaskCard.displayName = 'TaskCard';
export default TaskCard;
