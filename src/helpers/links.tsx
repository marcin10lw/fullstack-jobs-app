import {
  BarChart4,
  CalendarPlus,
  Contact2,
  Lock,
  NotebookTabs,
} from 'lucide-react';

export const links = [
  { id: 1, text: 'add job', path: '.', icon: <CalendarPlus /> },
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <NotebookTabs /> },
  { id: 3, text: 'stats', path: 'stats', icon: <BarChart4 /> },
  { id: 4, text: 'profile', path: 'profile', icon: <Contact2 /> },
  { id: 5, text: 'admin', path: 'admin', icon: <Lock /> },
];
