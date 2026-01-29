import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ThemeProvider } from 'next-themes'

// I am using the createSyncStorage approach to cache data for offline
// Which is built-in the Tanstack React Query
// As shown here https://tanstack.com/query/v4/docs/framework/react/examples/offline?path=examples%2Freact%2Foffline%2Fsrc%2FApp.jsx

// Basically it works in the way that we are creating the storage for cache
// And the if we're offline the cached data still can be userd for 24 hours
// So as the mutations which are paused until network's back

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 2000,
      retry: 0,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() => {
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries()
          })
        }}
      >
        <App />
        <Toaster position="top-right" />
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)