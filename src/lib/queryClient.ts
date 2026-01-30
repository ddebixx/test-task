import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(window.localStorage.removeItem(key)),
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Query error:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
})