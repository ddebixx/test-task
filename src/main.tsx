import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ThemeProvider } from 'next-themes'
import { queryClient } from './lib/utils.ts'
import { asyncStoragePersister } from './lib/utils.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <App />
        <Toaster position="top-right" />
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)