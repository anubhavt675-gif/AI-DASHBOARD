import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addNote, updateNote, setSearch } from '../redux/slices/notesSlice';
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';

const NotesPage = () => {
    const dispatch = useDispatch();
    const { items: notes, search, activeNote: activeNoteId } = useSelector(state => state.notes);
    const [isEditing, setIsEditing] = useState(false);
    
    const activeNote = useMemo(() => 
        notes.find(n => n.id === activeNoteId) || null,
        [notes, activeNoteId]
    );

    const filteredNotes = useMemo(() => {
        if (!search) return notes;
        const q = search.toLowerCase();
        return notes.filter(n => 
            n.title?.toLowerCase().includes(q) || 
            n.content?.toLowerCase().includes(q) ||
            n.tags?.some(t => t.toLowerCase().includes(q))
        );
    }, [notes, search]);

    const handleCreateNote = () => {
        dispatch(addNote({ title: 'New Note', content: '' }));
        setIsEditing(true);
        toast.success('Note created!');
    };

    const handleSaveNote = (updates) => {
        if (!activeNote) return;
        dispatch(updateNote({ id: activeNote.id, ...updates }));
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
            {/* Sidebar: Note List */}
            <div className="w-full md:w-80 flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center justify-between">
                    <h1 className="page-title text-3xl">Notes</h1>
                    <button 
                        onClick={handleCreateNote}
                        className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-glow hover:bg-primary-700 transition-colors"
                    >
                        +
                    </button>
                </div>

                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="input pl-10 py-2 text-sm"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
                    {filteredNotes.map(note => (
                        <NoteCard 
                            key={note.id} 
                            note={note} 
                            isActive={activeNoteId === note.id}
                        />
                    ))}
                    {filteredNotes.length === 0 && (
                        <div className="text-center py-12 opacity-50">
                            <p className="text-sm">No notes found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content: Editor */}
            <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {activeNote ? (
                        <motion.div 
                            key={activeNote.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col p-8"
                        >
                            <input
                                type="text"
                                className="bg-transparent border-none text-3xl font-bold text-dark-900 dark:text-white focus:outline-none focus:ring-0 mb-4 font-display"
                                value={activeNote.title}
                                onChange={(e) => handleSaveNote({ title: e.target.value })}
                                placeholder="Note Title"
                            />
                            <div className="flex gap-2 mb-6">
                                {activeNote.tags?.map(tag => (
                                    <span key={tag} className="text-xs font-semibold px-2 py-1 bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded-lg">
                                        #{tag}
                                    </span>
                                ))}
                                <button className="text-xs font-bold text-primary-600 hover:bg-primary-50 px-2 py-1 rounded-lg">+ Add Tag</button>
                            </div>
                            <textarea
                                className="flex-1 bg-transparent border-none resize-none text-dark-800 dark:text-dark-200 focus:outline-none focus:ring-0 text-lg leading-relaxed no-scrollbar"
                                value={activeNote.content}
                                onChange={(e) => handleSaveNote({ content: e.target.value })}
                                placeholder="Start writing something amazing..."
                            />
                            <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-800 flex justify-between items-center text-xs text-dark-400">
                                <span>Last updated {new Date(activeNote.updatedAt).toLocaleString()}</span>
                                <div className="flex gap-3">
                                    <button className="hover:text-primary-600">Markdown Help</button>
                                    <button className="hover:text-primary-600">Share Note</button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                            <span className="text-6xl mb-6 opacity-20">✍️</span>
                            <h3 className="text-2xl font-bold text-dark-900 dark:text-white">Select a note to read</h3>
                            <p className="text-dark-500 mt-2 max-w-xs">
                                Choose a note from the left sidebar or create a new one to get started.
                            </p>
                            <button 
                                onClick={handleCreateNote}
                                className="btn-primary mt-8"
                            >
                                Create New Note
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NotesPage;
