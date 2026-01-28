import { useEffect, useMemo, useState } from "react"

import { ITEMS_PER_PAGE } from "@/consts/consts"

interface UsePaginationParams<TItem> {
  items: TItem[]
  itemsPerPage?: number
}

interface UsePaginationResult<TItem> {
  page: number
  totalPages: number
  paginatedItems: TItem[]
  goToPage: (nextPage: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

export const usePagination = <TItem,>({
  items,
  itemsPerPage = ITEMS_PER_PAGE,
}: UsePaginationParams<TItem>): UsePaginationResult<TItem> => {
  const [page, setPage] = useState(1)

  const totalItems = items.length

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [itemsPerPage, totalItems],
  )

  useEffect(() => {
    function synchronizePageWithTotalPages() {
      if (page > totalPages) {
        setPage(totalPages)
      }

      if (page < 1) {
        setPage(1)
      }
    }

    synchronizePageWithTotalPages()
  }, [page, totalPages])

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage

    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [items, itemsPerPage, page])

  const goToPage = (nextPage: number) => {
    if (!Number.isFinite(nextPage)) {
      return
    }

    const clampedPage = Math.min(Math.max(1, nextPage), totalPages)

    setPage(clampedPage)
  }

  const goToNextPage =() => {
    goToPage(page + 1);
  };

  const goToPreviousPage =() => {
    goToPage(page - 1);
  };

  return {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  }
}

