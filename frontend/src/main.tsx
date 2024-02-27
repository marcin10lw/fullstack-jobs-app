import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ToastContainer } from 'react-toastify';
import { Toaster } from './components/ui/toaster';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />

      {/* TO BE REPLACED BY SHADCN SONNER */}
      <ToastContainer
        position="bottom-center"
        limit={3}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={2000}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
