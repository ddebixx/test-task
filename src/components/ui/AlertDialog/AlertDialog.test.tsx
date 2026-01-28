import { render, screen } from "@testing-library/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./AlertDialog";

describe("<AlertDialog />", () => {
    it("should render the alert dialog", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>Alert Dialog</AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialog = screen.getByRole("alertdialog");
    expect(alertDialog).toBeInTheDocument();
    expect(alertDialog).toHaveAttribute("data-slot", "alert-dialog-content");
    });

    it("should not render the alert dialog when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>Alert Dialog</AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialog = screen.queryByRole("alertdialog");
    expect(alertDialog).not.toBeInTheDocument();
    });

    it("should render the alert dialog content when open", () => {
        render(<AlertDialog open><AlertDialogContent>Content</AlertDialogContent></AlertDialog>);
        const alertDialogContent = screen.getByText("Content");
        expect(alertDialogContent).toBeInTheDocument();
        expect(alertDialogContent).toHaveAttribute("data-slot", "alert-dialog-content");
    });

    it("should not render the alert dialog content when closed", () => {
        render(<AlertDialog open={false}><AlertDialogContent>Content</AlertDialogContent></AlertDialog>);
        const alertDialogContent = screen.queryByText("Content");
        expect(alertDialogContent).not.toBeInTheDocument();
    });

    it("should render the alert dialog header when open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>Header</AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogHeader = screen.getByText("Header");
    expect(alertDialogHeader).toBeInTheDocument();
    expect(alertDialogHeader).toHaveAttribute("data-slot", "alert-dialog-header");
    });

    it("should not render the alert dialog header when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogHeader>Header</AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogHeader = screen.queryByText("Header");
    expect(alertDialogHeader).not.toBeInTheDocument();
    });

    it("should render the alert dialog title when open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogTitle = screen.getByText("Title");
    expect(alertDialogTitle).toBeInTheDocument();
    expect(alertDialogTitle).toHaveAttribute("data-slot", "alert-dialog-title");
    });

    it("should not render the alert dialog title when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogTitle = screen.queryByText("Title");
    expect(alertDialogTitle).not.toBeInTheDocument();
    });

    it("should render the alert dialog description when open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogDescription>Description</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogDescription = screen.getByText("Description");
    expect(alertDialogDescription).toBeInTheDocument();
    expect(alertDialogDescription).toHaveAttribute("data-slot", "alert-dialog-description");
    });

    it("should not render the alert dialog description when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogDescription>Description</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogDescription = screen.queryByText("Description");
    expect(alertDialogDescription).not.toBeInTheDocument();
    });

    it("should render the alert dialog footer when open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogFooter>Footer</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogFooter = screen.getByText("Footer");
    expect(alertDialogFooter).toBeInTheDocument();
    expect(alertDialogFooter).toHaveAttribute("data-slot", "alert-dialog-footer");
    });

    it("should not render the alert dialog footer when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogFooter>Footer</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogFooter = screen.queryByText("Footer");
    expect(alertDialogFooter).not.toBeInTheDocument();
    });

    it("should render the alert dialog action when open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogAction>Action</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogAction = screen.getByText("Action");
    expect(alertDialogAction).toBeInTheDocument();
    expect(alertDialogAction).toHaveAttribute("data-slot", "alert-dialog-action");
    });

    it("should not render the alert dialog action when closed", () => {
    render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogAction>Action</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alertDialogAction = screen.queryByText("Action");
    expect(alertDialogAction).toBeNull();
    });

    it("should render the alert dialog cancel when open", () => {
        render(<AlertDialog open>
            <AlertDialogContent>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>);
        const alertDialogCancel = screen.getByText("Cancel");
        expect(alertDialogCancel).toBeInTheDocument();
        expect(alertDialogCancel).toHaveAttribute("data-slot", "alert-dialog-cancel");
    });

    it("should not render the alert dialog cancel when closed", () => {
        render(<AlertDialog open={false}><AlertDialogContent><AlertDialogCancel>Cancel</AlertDialogCancel></AlertDialogContent  ></AlertDialog>);
        const alertDialogCancel = screen.queryByText("Cancel");
        expect(alertDialogCancel).toBeDefined();
    });
});