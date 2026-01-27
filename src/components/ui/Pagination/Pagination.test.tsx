import { render, screen } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./Pagination";

describe("<Pagination />", () => {
  describe("Pagination", () => {
    it("should render pagination with navigation role", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const nav = screen.getByRole("navigation", { name: "pagination" });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("data-slot", "pagination");
    });

    it("should apply custom className", () => {
      render(
        <Pagination className="custom-pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("custom-pagination");
    });
  });

  describe("PaginationContent", () => {
    it("should render pagination content", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const content = screen.getByText("1").closest('[data-slot="pagination-content"]');
      expect(content).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Pagination>
          <PaginationContent className="custom-content">
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const content = screen.getByText("1").closest('[data-slot="pagination-content"]');
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("PaginationItem", () => {
    it("should render pagination item", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const item = screen.getByText("1").closest('[data-slot="pagination-item"]');
      expect(item).toBeInTheDocument();
    });
  });

  describe("PaginationLink", () => {
    it("should render pagination link", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="/page/1">1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const link = screen.getByText("1");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/page/1");
      expect(link.closest('[data-slot="pagination-link"]')).toBeInTheDocument();
    });

    it("should mark active link with aria-current", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const link = screen.getByText("1");
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link).toHaveAttribute("data-active", "true");
    });

    it("should render with different sizes", () => {
      const sizes = ["default", "xs", "sm", "lg", "icon"] as const;
      
      sizes.forEach((size) => {
        const { unmount } = render(
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink size={size}>{size}</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        );
        expect(screen.getByText(size)).toBeInTheDocument();
        unmount();
      });
    });

    it("should apply custom className", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink className="custom-link">1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const link = screen.getByText("1");
      expect(link).toHaveClass("custom-link");
    });
  });

  describe("PaginationPrevious", () => {
    it("should render previous button", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/prev">Previous</PaginationPrevious>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const previous = screen.getByRole("link", { name: /previous/i });
      expect(previous).toBeInTheDocument();
      expect(previous).toHaveAttribute("aria-label", "Go to previous page");
    });

    it("should apply custom className", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="custom-prev" href="/prev" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const previous = screen.getByRole("link", { name: /previous/i });
      expect(previous).toHaveClass("custom-prev");
    });
  });

  describe("PaginationNext", () => {
    it("should render next button", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href="/next">Next</PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const next = screen.getByRole("link", { name: /next/i });
      expect(next).toBeInTheDocument();
      expect(next).toHaveAttribute("aria-label", "Go to next page");
    });

    it("should apply custom className", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext className="custom-next" href="/next" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const next = screen.getByRole("link", { name: /next/i });
      expect(next).toHaveClass("custom-next");
    });
  });

  describe("PaginationEllipsis", () => {
    it("should render ellipsis", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const ellipsis = screen.getByText("More pages").closest('[data-slot="pagination-ellipsis"]');
      expect(ellipsis).toBeInTheDocument();
      expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    });

    it("should apply custom className", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis className="custom-ellipsis" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const ellipsis = screen.getByText("More pages").closest('[data-slot="pagination-ellipsis"]');
      expect(ellipsis).toHaveClass("custom-ellipsis");
    });
  });

  describe("Pagination Composition", () => {
    it("should render complete pagination structure", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/prev" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive href="/page/2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/next" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );

      expect(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
      expect(screen.getByText("More pages")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });
});
