import {
  BarChart4,
  CalendarPlus,
  Contact2,
  Lock,
  NotebookTabs,
} from 'lucide-react';
import { ROUTES } from 'src/routes';

export const links = [
  { id: 2, text: 'all jobs', path: ROUTES.allJobs, icon: <NotebookTabs /> },
  { id: 1, text: 'add job', path: ROUTES.addJob, icon: <CalendarPlus /> },
  { id: 3, text: 'stats', path: ROUTES.stats, icon: <BarChart4 /> },
  { id: 4, text: 'profile', path: ROUTES.profile, icon: <Contact2 /> },
  { id: 5, text: 'admin', path: ROUTES.admin, icon: <Lock /> },
];
