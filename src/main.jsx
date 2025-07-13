import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
    </QueryClientProvider>
  </StrictMode>,
)
