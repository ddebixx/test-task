import { useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/react-query"

interface UseQueryFetchStateResult<TData = unknown> {
  cachedData: TData | undefined
  shouldFetch: boolean
}

export const useQueryFetchState = <TData = unknown>(
  queryKey: QueryKey
): UseQueryFetchStateResult<TData> => {
  const queryClient = useQueryClient()
  const isRestoring = useIsRestoring()

  const cachedData = queryClient.getQueryData<TData>(queryKey) as TData | undefined
  const shouldFetch = onlineManager.isOnline() && !isRestoring

  return { cachedData, shouldFetch }
}
