import { format, formatDistanceToNow, isPast, isToday, isTomorrow, parseISO } from 'date-fns';

export const formatDate = (dateStr) => {
  if (!dateStr) return 'No date';
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy HH:mm');
  } catch {
    return '';
  }
};

export const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return '';
  }
};

export const getDueDateStatus = (dueDateStr) => {
  if (!dueDateStr) return null;
  try {
    const date = parseISO(dueDateStr);
    if (isToday(date)) return { label: 'Due today', color: 'warning', urgent: true };
    if (isTomorrow(date)) return { label: 'Due tomorrow', color: 'info', urgent: false };
    if (isPast(date)) return { label: 'Overdue', color: 'danger', urgent: true };
    return { label: `Due ${formatDate(dueDateStr)}`, color: 'default', urgent: false };
  } catch {
    return null;
  }
};

export const truncate = (str, maxLength = 100) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

export const getPriorityConfig = (priority) => {
  const configs = {
    high: { label: 'High', className: 'badge-high', color: '#ef4444', dot: 'bg-red-500' },
    medium: { label: 'Medium', className: 'badge-medium', color: '#f59e0b', dot: 'bg-amber-500' },
    low: { label: 'Low', className: 'badge-low', color: '#10b981', dot: 'bg-emerald-500' },
  };
  return configs[priority] || configs.low;
};

export const getStatusConfig = (status) => {
  const configs = {
    completed: { label: 'Completed', className: 'badge-completed', color: '#3b82f6' },
    'in-progress': { label: 'In Progress', className: 'badge bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400', color: '#8b5cf6' },
    pending: { label: 'Pending', className: 'badge bg-dark-100 text-dark-600 dark:bg-dark-700 dark:text-dark-400', color: '#64748b' },
  };
  return configs[status] || configs.pending;
};

export const getNoteColorConfig = (color) => {
  const configs = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', dot: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-400' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800/50', dot: 'bg-purple-500', text: 'text-purple-700 dark:text-purple-400' },
    green: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400' },
    red: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/50', dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' },
    pink: { bg: 'bg-pink-50 dark:bg-pink-900/20', border: 'border-pink-200 dark:border-pink-800/50', dot: 'bg-pink-500', text: 'text-pink-700 dark:text-pink-400' },
  };
  return configs[color] || configs.blue;
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

export const groupTasksByDate = (tasks) => {
  const groups = {};
  tasks.forEach(task => {
    if (task.dueDate) {
      const dateKey = format(parseISO(task.dueDate), 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(task);
    }
  });
  return groups;
};
