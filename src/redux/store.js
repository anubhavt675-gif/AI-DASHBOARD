import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import notesReducer from './slices/notesSlice';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tasks/setTasks', 'notes/setNotes'],
      },
    }),
});

export default store;
