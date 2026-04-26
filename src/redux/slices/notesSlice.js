import { createSlice } from '@reduxjs/toolkit';

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const SAMPLE_NOTES = [
  {
    id: generateId(),
    title: 'Project Kickoff Notes',
    content: '## Meeting Summary\n\n**Date:** Today\n\n### Key Points\n- Architecture review completed\n- Team assignments finalized\n- Sprint 1 goals defined\n\n### Action Items\n1. Setup CI/CD pipeline\n2. Initialize project repositories\n3. Schedule design review',
    color: 'blue',
    pinned: true,
    tags: ['meeting', 'project'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'API Design Decisions',
    content: '## REST vs GraphQL\n\nDecided to go with REST for v1 due to:\n- Team familiarity\n- Simpler caching strategy\n- Faster implementation\n\n### Endpoints\n- POST /auth/login\n- GET /tasks\n- POST /tasks\n- PATCH /tasks/:id\n- DELETE /tasks/:id',
    color: 'purple',
    pinned: false,
    tags: ['api', 'development'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: generateId(),
    title: 'Ideas & Brainstorm',
    content: '💡 **Feature Ideas for v2**\n\n- AI-powered task prioritization\n- Team collaboration features\n- Time tracking integration\n- Slack/Teams notifications\n- Mobile app (React Native)\n- Advanced analytics dashboard',
    color: 'green',
    pinned: true,
    tags: ['ideas', 'roadmap'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: generateId(),
    title: 'Useful Resources',
    content: '### Learning Resources\n\n- [React Docs](https://react.dev)\n- [Redux Toolkit](https://redux-toolkit.js.org)\n- [Tailwind CSS](https://tailwindcss.com)\n- [Framer Motion](https://framer.com/motion)\n\n### Tools\n- Figma for design\n- Notion for docs\n- Linear for issues',
    color: 'amber',
    pinned: false,
    tags: ['resources', 'learning'],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

const getStoredNotes = () => {
  try {
    const stored = localStorage.getItem('nexus_notes');
    return stored ? JSON.parse(stored) : SAMPLE_NOTES;
  } catch { return SAMPLE_NOTES; }
};

const saveNotes = (notes) => localStorage.setItem('nexus_notes', JSON.stringify(notes));

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: getStoredNotes(),
    search: '',
    activeNote: null,
    loading: false,
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
        color: 'blue',
        tags: [],
        ...action.payload,
      };
      state.items.unshift(newNote);
      saveNotes(state.items);
      state.activeNote = newNote.id;
    },
    updateNote: (state, action) => {
      const idx = state.items.findIndex(n => n.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload, updatedAt: new Date().toISOString() };
        saveNotes(state.items);
      }
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
      if (state.activeNote === action.payload) state.activeNote = state.items[0]?.id || null;
      saveNotes(state.items);
    },
    togglePin: (state, action) => {
      const note = state.items.find(n => n.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
        saveNotes(state.items);
      }
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, togglePin, setActiveNote, setSearch } = notesSlice.actions;
export default notesSlice.reducer;
