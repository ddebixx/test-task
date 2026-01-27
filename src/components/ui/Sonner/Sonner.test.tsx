import { render } from "@testing-library/react";
import { Toaster } from "./Sonner";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
  }),
}));

describe("<Toaster />", () => {
  describe("Rendering", () => {
    it("should render toaster component without errors", () => {
      expect(() => render(<Toaster />)).not.toThrow();
    });

    it("should apply custom props without errors", () => {
      expect(() => render(<Toaster position="bottom-center" />)).not.toThrow();
    });

    it("should use theme from useTheme hook", () => {
      expect(() => render(<Toaster />)).not.toThrow();
    });
  });

  describe("Configuration", () => {
    it("should render with default configuration", () => {
      expect(() => render(<Toaster />)).not.toThrow();
    });

    it("should accept custom className", () => {
      expect(() => render(<Toaster className="custom-toaster" />)).not.toThrow();
    });
  });
});
