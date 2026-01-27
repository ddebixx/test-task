import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("<Skeleton />", () => {
  describe("Rendering", () => {
    it("should render skeleton component", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it("should render with children", () => {
      render(<Skeleton>Loading...</Skeleton>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Skeleton className="custom-skeleton" />);
      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("custom-skeleton");
    });

    it("should apply custom width and height via className", () => {
      const { container } = render(<Skeleton className="w-10 h-10" />);
      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("w-10", "h-10");
    });
  });

  describe("Accessibility", () => {
    it("should support aria attributes", () => {
      render(<Skeleton aria-label="Loading content" />);
      const skeleton = screen.getByLabelText("Loading content");
      expect(skeleton).toBeInTheDocument();
    });

    it("should support role attribute", () => {
      render(<Skeleton role="status" aria-label="Loading" />);
      const skeleton = screen.getByRole("status", { name: "Loading" });
      expect(skeleton).toBeInTheDocument();
    });
  });
});
