import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { deleteNote, togglePin, setActiveNote } from '../redux/slices/notesSlice';
import { getNoteColorConfig, formatRelativeTime, truncate } from '../utils/helpers';

const NoteCard = memo(({ note, isActive = false, onEdit }) => {
  const dispatch = useDispatch();
  const colorConfig = getNoteColorConfig(note.color);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    if (window.confirm('Delete this note?')) dispatch(deleteNote(note.id));
  }, [dispatch, note.id]);

  const handlePin = useCallback((e) => {
    e.stopPropagation();
    dispatch(togglePin(note.id));
  }, [dispatch, note.id]);

  const handleSelect = useCallback(() => {
    dispatch(setActiveNote(note.id));
    if (onEdit) onEdit(note);
  }, [dispatch, note, onEdit]);

  // Extract plain text from markdown-like content
  const plainContent = note.content
    ?.replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\n/g, ' ')
    .trim();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleSelect}
      className={`
        group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300
        hover:shadow-card-hover hover:-translate-y-0.5
        ${colorConfig.bg} ${colorConfig.border}
        ${isActive ? 'ring-2 ring-primary-500 shadow-glow' : ''}
      `}
    >
      {/* Pin badge */}
      {note.pinned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-xs">📌</span>
        </div>
      )}

      {/* Color dot */}
      <div className={`w-2.5 h-2.5 rounded-full ${colorConfig.dot} mb-3`} />

      {/* Title */}
      <h3 className="font-semibold text-dark-900 dark:text-white text-sm mb-2 line-clamp-1">
        {note.title || 'Untitled Note'}
      </h3>

      {/* Content preview */}
      <p className="text-xs text-dark-500 dark:text-dark-400 leading-relaxed line-clamp-3 mb-3">
        {truncate(plainContent, 120) || 'No content yet...'}
      </p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map(tag => (
            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorConfig.text} bg-white/60 dark:bg-dark-900/40`}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-dark-400 dark:text-dark-500">
          {formatRelativeTime(note.updatedAt)}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePin}
            className={`p-1.5 rounded-lg transition-all hover:scale-110 ${note.pinned ? 'text-primary-600' : 'text-dark-400 hover:text-primary-500'}`}
            title={note.pinned ? 'Unpin' : 'Pin'}
          >
            <svg className="w-3.5 h-3.5" fill={note.pinned ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-dark-400 hover:text-red-500 transition-all hover:scale-110"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

NoteCard.displayName = 'NoteCard';
export default NoteCard;
