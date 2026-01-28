import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("<Button />", () => {
  describe("Rendering", () => {
    it("should render the button with the default variant", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("data-variant", "default");
      expect(button).toHaveAttribute("data-size", "default");
    });

    it("should render button with all variants", () => {
      const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
      
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>Test {variant}</Button>);
        const button = screen.getByRole("button", { name: `Test ${variant}` });
        expect(button).toHaveAttribute("data-variant", variant);
        unmount();
      }
    });

    it("should render button with all sizes", () => {
      const sizes = ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] as const;
      
      for (const size of sizes) {
        const { unmount } = render(<Button size={size}>Test {size}</Button>);
        const button = screen.getByRole("button", { name: `Test ${size}` });
        expect(button).toHaveAttribute("data-size", size);
        unmount();
      }
    });

    it("should apply custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("should render as disabled when disabled prop is set", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("should call onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should render as child component when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole("link", { name: "Link Button" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("data-slot", "button");
    });
  });

  describe("Accessibility", () => {
    it("should have proper button role", () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should support aria attributes", () => {
      render(
        <Button aria-label="Custom label" aria-pressed="true">
          Button
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });
  });
});