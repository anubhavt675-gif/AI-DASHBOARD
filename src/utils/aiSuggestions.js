// AI Suggestion Engine (Mock Logic)
import { isPast, isToday, isTomorrow, differenceInDays, parseISO } from 'date-fns';

export const generateAISuggestions = (tasks) => {
  const suggestions = [];
  if (!tasks || tasks.length === 0) return suggestions;

  const pending = tasks.filter(t => t.status === 'pending');
  const completed = tasks.filter(t => t.status === 'completed');
  const highPriority = pending.filter(t => t.priority === 'high');
  const overdue = pending.filter(t => t.dueDate && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate)));
  const dueToday = pending.filter(t => t.dueDate && isToday(parseISO(t.dueDate)));
  const dueTomorrow = pending.filter(t => t.dueDate && isTomorrow(parseISO(t.dueDate)));
  const completionRate = tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0;

  // Overdue tasks warning
  if (overdue.length > 0) {
    suggestions.push({
      id: 'overdue',
      type: 'warning',
      icon: '⚠️',
      title: 'Overdue Tasks',
      message: `You have ${overdue.length} overdue task${overdue.length > 1 ? 's' : ''}. Address these immediately to stay on track.`,
      action: 'View Overdue',
      filter: { status: 'pending' },
    });
  }

  // High priority focus
  if (highPriority.length > 2) {
    suggestions.push({
      id: 'high_priority',
      type: 'urgent',
      icon: '🔥',
      title: 'Focus Mode',
      message: `${highPriority.length} high-priority tasks require your attention. Focus on these first to maximize impact.`,
      action: 'View High Priority',
      filter: { priority: 'high' },
    });
  }

  // Today's workload
  if (dueToday.length > 0) {
    const timeMsg = dueToday.length > 3
      ? `Heavy workload today — ${dueToday.length} tasks due. Consider delegating or rescheduling.`
      : `You have ${dueToday.length} task${dueToday.length > 1 ? 's' : ''} due today. Stay focused!`;
    suggestions.push({
      id: 'today',
      type: 'info',
      icon: '📅',
      title: "Today's Agenda",
      message: timeMsg,
      action: 'View Today\'s Tasks',
      filter: {},
    });
  }

  // Tomorrow preparation
  if (dueTomorrow.length > 0) {
    suggestions.push({
      id: 'tomorrow',
      type: 'info',
      icon: '🌅',
      title: 'Plan Ahead',
      message: `${dueTomorrow.length} task${dueTomorrow.length > 1 ? 's' : ''} due tomorrow. Review them now to be prepared.`,
      action: null,
      filter: {},
    });
  }

  // Productivity celebration
  if (completionRate >= 70) {
    suggestions.push({
      id: 'celebrate',
      type: 'success',
      icon: '🎉',
      title: 'Outstanding Progress!',
      message: `You've completed ${Math.round(completionRate)}% of your tasks. Keep up the excellent momentum!`,
      action: null,
      filter: {},
    });
  } else if (completionRate < 30 && tasks.length > 4) {
    suggestions.push({
      id: 'improve',
      type: 'tip',
      icon: '💡',
      title: 'Boost Your Productivity',
      message: 'Completion rate is low. Try the Pomodoro technique — 25 min work, 5 min break. Start with your easiest pending task!',
      action: null,
      filter: {},
    });
  }

  // Pending tasks overload
  if (pending.length > 8) {
    suggestions.push({
      id: 'overload',
      type: 'warning',
      icon: '😰',
      title: 'Task Overload Detected',
      message: `You have ${pending.length} pending tasks. Consider breaking them into smaller tasks or setting realistic deadlines.`,
      action: null,
      filter: {},
    });
  }

  // Empty queue
  if (pending.length === 0 && completed.length > 0) {
    suggestions.push({
      id: 'clear',
      type: 'success',
      icon: '✅',
      title: 'All Clear!',
      message: "You've completed all your tasks! Time to plan for tomorrow or take a well-deserved break.",
      action: null,
      filter: {},
    });
  }

  // Best time suggestions
  const hour = new Date().getHours();
  let timeOfDay = '';
  if (hour >= 6 && hour < 12) timeOfDay = '🌄 Morning energy is at peak — tackle your hardest high-priority tasks now!';
  else if (hour >= 12 && hour < 14) timeOfDay = '☕ Post-lunch dip incoming — handle quick, easy tasks to maintain momentum.';
  else if (hour >= 14 && hour < 17) timeOfDay = '⚡ Afternoon focus window — great time for deep work and collaborative tasks.';
  else if (hour >= 17 && hour < 20) timeOfDay = '🌆 End of day — review completed tasks and plan priorities for tomorrow.';
  else timeOfDay = '🌙 Late hours — focus on low-priority tasks or plan for the next day.';

  if (pending.length > 0) {
    suggestions.push({
      id: 'time_suggestion',
      type: 'tip',
      icon: '⏰',
      title: 'Smart Time Tip',
      message: timeOfDay,
      action: null,
      filter: {},
    });
  }

  return suggestions.slice(0, 4);
};

export const categorizeTasks = (title, description = '') => {
  const text = `${title} ${description}`.toLowerCase();
  if (/meet|call|sync|standup|review|interview|presentation/.test(text)) return 'Meeting';
  if (/design|ui|ux|figma|mockup|wireframe|prototype/.test(text)) return 'Design';
  if (/deploy|devops|server|docker|kubernetes|ci\/cd|pipeline/.test(text)) return 'DevOps';
  if (/test|spec|bug|fix|debug|qa|quality/.test(text)) return 'QA/Testing';
  if (/write|report|doc|documentation|blog|article/.test(text)) return 'Documentation';
  if (/research|study|learn|read|explore|analyze/.test(text)) return 'Research';
  if (/code|develop|implement|build|feature|api|backend|frontend/.test(text)) return 'Development';
  if (/plan|strategy|roadmap|goal|objective|milestone/.test(text)) return 'Management';
  return 'General';
};

export const suggestPriority = (title, dueDate) => {
  const text = title.toLowerCase();
  if (/urgent|asap|critical|emergency|immediately|deadline/.test(text)) return 'high';
  if (/important|priority|key|major/.test(text)) return 'medium';
  if (dueDate) {
    const daysUntil = differenceInDays(parseISO(dueDate), new Date());
    if (daysUntil <= 1) return 'high';
    if (daysUntil <= 3) return 'medium';
  }
  return 'low';
};
