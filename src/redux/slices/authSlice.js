import { createSlice } from '@reduxjs/toolkit';

const MOCK_USERS = [
  { id: 1, email: 'admin@nexus.ai', password: 'admin123', name: 'Alex Morgan', role: 'admin', avatar: 'AM' },
  { id: 2, email: 'user@nexus.ai', password: 'user123', name: 'Sam Wilson', role: 'user', avatar: 'SW' },
];

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem('nexus_auth');
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredAuth(),
    isAuthenticated: !!getStoredAuth(),
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('nexus_auth', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('nexus_auth');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('nexus_auth', JSON.stringify(state.user));
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, updateUser } = authSlice.actions;

// Thunks
export const loginUser = (email, password) => (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      dispatch(loginSuccess(safeUser));
    } else {
      dispatch(loginFailure('Invalid email or password. Try admin@nexus.ai / admin123'));
    }
  }, 800);
};

export const signupUser = (name, email, password) => (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) {
      dispatch(loginFailure('Email already registered.'));
    } else {
      const newUser = {
        id: Date.now(), email, name, role: 'user',
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      };
      MOCK_USERS.push({ ...newUser, password });
      dispatch(loginSuccess(newUser));
    }
  }, 800);
};

export default authSlice.reducer;
