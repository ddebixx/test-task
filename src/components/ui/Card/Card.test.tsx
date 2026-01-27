import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./Card";

describe("<Card />", () => {
  describe("Card", () => {
    it("should render card component", () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText("Card content");
      expect(card.closest('[data-slot="card"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Card className="custom-card">Content</Card>);
      const card = screen.getByText("Content").closest('[data-slot="card"]');
      expect(card).toHaveClass("custom-card");
    });
  });

  describe("CardHeader", () => {
    it("should render card header", () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      const header = screen.getByText("Header content");
      expect(header.closest('[data-slot="card-header"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardHeader className="custom-header">Header</CardHeader>
        </Card>
      );
      const header = screen.getByText("Header");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("should render card title", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText("Card Title");
      expect(title.closest('[data-slot="card-title"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("should render card description", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByText("Card description");
      expect(description.closest('[data-slot="card-description"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription className="custom-desc">Description</CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("CardAction", () => {
    it("should render card action", () => {
      render(
        <Card>
          <CardHeader>
            <CardAction>Action</CardAction>
          </CardHeader>
        </Card>
      );
      const action = screen.getByText("Action");
      expect(action.closest('[data-slot="card-action"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardAction className="custom-action">Action</CardAction>
          </CardHeader>
        </Card>
      );
      const action = screen.getByText("Action");
      expect(action).toHaveClass("custom-action");
    });
  });

  describe("CardContent", () => {
    it("should render card content", () => {
      render(
        <Card>
          <CardContent>Main content</CardContent>
        </Card>
      );
      const content = screen.getByText("Main content");
      expect(content.closest('[data-slot="card-content"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardContent className="custom-content">Content</CardContent>
        </Card>
      );
      const content = screen.getByText("Content");
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("CardFooter", () => {
    it("should render card footer", () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      const footer = screen.getByText("Footer content");
      expect(footer.closest('[data-slot="card-footer"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card>
          <CardFooter className="custom-footer">Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText("Footer");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Card Composition", () => {
    it("should render complete card structure", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
