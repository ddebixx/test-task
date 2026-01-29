import { QueryClient } from "@tanstack/react-query"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(window.localStorage.removeItem(key)),
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
})

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
})