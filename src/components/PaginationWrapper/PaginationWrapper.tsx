import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/Pagination"

interface PaginationWrapperProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
}

export const PaginationWrapper = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: PaginationWrapperProps) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center pt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onPreviousPage()
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === currentPage}
                  onClick={(event) => {
                    event.preventDefault()
                    onPageChange(pageNumber)
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault()
                onNextPage()
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
