import { createSlice } from '@reduxjs/toolkit';
// removed crypto import

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const SAMPLE_TASKS = [
  { id: generateId(), title: 'Design system architecture', description: 'Plan the microservices structure for the new platform', priority: 'high', status: 'pending', dueDate: new Date(Date.now() + 86400000).toISOString(), category: 'Development', createdAt: new Date().toISOString(), tags: ['architecture', 'planning'] },
  { id: generateId(), title: 'Review pull requests', description: 'Review and merge pending PRs from the team', priority: 'high', status: 'pending', dueDate: new Date(Date.now() + 3600000).toISOString(), category: 'Development', createdAt: new Date().toISOString(), tags: ['review', 'code'] },
  { id: generateId(), title: 'Update quarterly report', description: 'Compile Q1 metrics and performance data', priority: 'medium', status: 'in-progress', dueDate: new Date(Date.now() + 172800000).toISOString(), category: 'Management', createdAt: new Date().toISOString(), tags: ['report', 'metrics'] },
  { id: generateId(), title: 'Team standup meeting', description: 'Daily sync with the development team', priority: 'medium', status: 'completed', dueDate: new Date().toISOString(), category: 'Meeting', createdAt: new Date().toISOString(), tags: ['meeting', 'team'] },
  { id: generateId(), title: 'Write unit tests', description: 'Add test coverage for the authentication module', priority: 'low', status: 'pending', dueDate: new Date(Date.now() + 259200000).toISOString(), category: 'Development', createdAt: new Date().toISOString(), tags: ['testing', 'quality'] },
  { id: generateId(), title: 'Deploy staging environment', description: 'Set up the new staging server configuration', priority: 'high', status: 'in-progress', dueDate: new Date(Date.now() + 7200000).toISOString(), category: 'DevOps', createdAt: new Date().toISOString(), tags: ['deployment', 'devops'] },
  { id: generateId(), title: 'Client presentation prep', description: 'Prepare slides and demo for the client showcase', priority: 'high', status: 'pending', dueDate: new Date(Date.now() + 432000000).toISOString(), category: 'Management', createdAt: new Date().toISOString(), tags: ['client', 'presentation'] },
  { id: generateId(), title: 'Database optimization', description: 'Optimize slow queries and add proper indexes', priority: 'medium', status: 'completed', dueDate: new Date(Date.now() - 86400000).toISOString(), category: 'Development', createdAt: new Date().toISOString(), tags: ['database', 'performance'] },
];

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem('nexus_tasks');
    return stored ? JSON.parse(stored) : SAMPLE_TASKS;
  } catch { return SAMPLE_TASKS; }
};

const saveTasks = (tasks) => {
  localStorage.setItem('nexus_tasks', JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: getStoredTasks(),
    filter: { status: 'all', priority: 'all', search: '', sortBy: 'createdAt', sortOrder: 'desc' },
    currentPage: 1,
    itemsPerPage: 6,
    loading: false,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        ...action.payload,
      };
      state.items.unshift(newTask);
      saveTasks(state.items);
    },
    updateTask: (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload, updatedAt: new Date().toISOString() };
        saveTasks(state.items);
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveTasks(state.items);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        task.updatedAt = new Date().toISOString();
        saveTasks(state.items);
      }
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filter = { status: 'all', priority: 'all', search: '', sortBy: 'createdAt', sortOrder: 'desc' };
      state.currentPage = 1;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskStatus, setFilter, setPage, resetFilters } = tasksSlice.actions;

// Selectors
export const selectFilteredTasks = (state) => {
  const { items, filter } = state.tasks;
  let filtered = [...items];

  if (filter.status !== 'all') {
    filtered = filtered.filter(t => t.status === filter.status);
  }
  if (filter.priority !== 'all') {
    filtered = filtered.filter(t => t.priority === filter.priority);
  }
  if (filter.search) {
    const q = filter.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q)
    );
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  filtered.sort((a, b) => {
    if (filter.sortBy === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (filter.sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (filter.sortBy === 'title') return a.title.localeCompare(b.title);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (filter.sortOrder === 'asc' && filter.sortBy !== 'createdAt') filtered.reverse();
  return filtered;
};

export const selectTaskStats = (state) => {
  const tasks = state.tasks.items;
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length,
  };
};

export default tasksSlice.reducer;
