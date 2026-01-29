import { usePagination } from "@/hooks/usePagination"

interface PaginationWrapperProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
}

interface UsePaginatedDataParams<TItem> {
  data: TItem[] | undefined
  itemsPerPage?: number
}

interface UsePaginatedDataResult<TItem> {
  paginatedItems: TItem[]
  paginationProps: PaginationWrapperProps
}

export const usePaginatedData = <TItem>({
  data,
  itemsPerPage,
}: UsePaginatedDataParams<TItem>): UsePaginatedDataResult<TItem> => {
  const items = data ?? []
  const {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination<TItem>({ items, itemsPerPage })

  const paginationProps: PaginationWrapperProps = {
    currentPage: page,
    totalPages,
    onPageChange: goToPage,
    onNextPage: goToNextPage,
    onPreviousPage: goToPreviousPage,
  }

  return { paginatedItems, paginationProps }
}
