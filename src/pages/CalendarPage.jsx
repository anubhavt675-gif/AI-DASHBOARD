import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../calendar.css'; // We'll create this for custom styling

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
    const { items: tasks } = useSelector(state => state.tasks);

    const events = useMemo(() => {
        return tasks.filter(t => t.dueDate).map(task => ({
            id: task.id,
            title: task.title,
            start: new Date(task.dueDate),
            end: new Date(new Date(task.dueDate).getTime() + 3600000), // 1 hour duration
            allDay: false,
            priority: task.priority,
            status: task.status
        }));
    }, [tasks]);

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3b82f6'; // default blue
        if (event.priority === 'high') backgroundColor = '#ef4444';
        if (event.priority === 'low') backgroundColor = '#10b981';
        if (event.status === 'completed') backgroundColor = '#94a3b8';

        return {
            style: {
                backgroundColor,
                borderRadius: '8px',
                opacity: 0.8,
                color: 'white',
                border: 'none',
                display: 'block',
                fontSize: '0.75rem',
                padding: '2px 6px'
            }
        };
    };

    return (
        <div className="h-[calc(100vh-140px)] space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title text-4xl">Calendar</h1>
                    <p className="text-dark-500 dark:text-dark-400 mt-1">Visualize your deadlines and events.</p>
                </div>
            </div>

            <div className="flex-1 glass p-6 rounded-3xl overflow-hidden border-white/10">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    eventPropGetter={eventStyleGetter}
                    views={['month', 'week', 'day']}
                    popup
                />
            </div>
        </div>
    );
};

export default CalendarPage;
