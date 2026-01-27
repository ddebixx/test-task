import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";

describe("<Dialog />", () => {
  describe("Dialog", () => {
    it("should render dialog root", () => {
      render(
        <Dialog open>
          <DialogContent>Dialog content</DialogContent>
        </Dialog>
      );
      expect(screen.getByText("Dialog content")).toBeInTheDocument();
    });

    it("should not render dialog when closed", () => {
      render(
        <Dialog open={false}>
          <DialogContent>Dialog content</DialogContent>
        </Dialog>
      );
      expect(screen.queryByText("Dialog content")).not.toBeInTheDocument();
    });
  });

  describe("DialogTrigger", () => {
    it("should render trigger button", () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );
      expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument();
    });
  });

  describe("DialogContent", () => {
    it("should render dialog content when open", () => {
      render(
        <Dialog open>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );
      const content = screen.getByText("Dialog Content");
      expect(content.closest('[data-slot="dialog-content"]')).toBeInTheDocument();
    });

    it("should show close button by default", () => {
      render(
        <Dialog open>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );
      const closeButton = screen.getByRole("button", { name: "Close" });
      expect(closeButton).toBeInTheDocument();
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>Content</DialogContent>
        </Dialog>
      );
      expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Dialog open>
          <DialogContent className="custom-content">Content</DialogContent>
        </Dialog>
      );
      const content = screen.getByText("Content").closest('[data-slot="dialog-content"]');
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("DialogHeader", () => {
    it("should render dialog header", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>Header content</DialogHeader>
          </DialogContent>
        </Dialog>
      );
      const header = screen.getByText("Header content");
      expect(header.closest('[data-slot="dialog-header"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header">Header</DialogHeader>
          </DialogContent>
        </Dialog>
      );
      const header = screen.getByText("Header");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("DialogTitle", () => {
    it("should render dialog title", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      const title = screen.getByText("Dialog Title");
      expect(title.closest('[data-slot="dialog-title"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle className="custom-title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("DialogDescription", () => {
    it("should render dialog description", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      const description = screen.getByText("Dialog description");
      expect(description.closest('[data-slot="dialog-description"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogDescription className="custom-desc">Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("DialogFooter", () => {
    it("should render dialog footer", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter>Footer content</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const footer = screen.getByText("Footer content");
      expect(footer.closest('[data-slot="dialog-footer"]')).toBeInTheDocument();
    });

    it("should show close button when showCloseButton is true", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter showCloseButton>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const closeButtons = screen.getAllByRole("button", { name: "Close" });
      expect(closeButtons.length).toBeGreaterThan(0);
    });

    it("should not show close button when showCloseButton is false", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter showCloseButton={false}>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const closeButtons = screen.getAllByRole("button", { name: "Close" });
      expect(closeButtons.length).toBe(1);
    });

    it("should apply custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter className="custom-footer">Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const footer = screen.getByText("Footer");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("DialogClose", () => {
    it("should render close button", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogClose>Custom Close</DialogClose>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole("button", { name: "Custom Close" })).toBeInTheDocument();
    });
  });

  describe("Dialog Interactions", () => {
    it("should close dialog when close button is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Dialog open onOpenChange={onOpenChange}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: "Close" });
      await user.click(closeButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Dialog Composition", () => {
    it("should render complete dialog structure", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description</DialogDescription>
            </DialogHeader>
            <div>Content</div>
            <DialogFooter>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
