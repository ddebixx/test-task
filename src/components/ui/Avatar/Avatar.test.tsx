import { render, screen } from "@testing-library/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "./Avatar";

describe("<Avatar />", () => {
  describe("Avatar", () => {
    it("should render avatar with default size", () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      const avatar = screen.getByText("AB");
      expect(avatar.closest('[data-slot="avatar"]')).toBeInTheDocument();
      expect(avatar.closest('[data-slot="avatar"]')).toHaveAttribute("data-size", "default");
    });

    it("should render avatar with different sizes", () => {
      const sizes = ["default", "sm", "lg"] as const;

      for (const size of sizes) {
        const { unmount } = render(
          <Avatar size={size}>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        );
        const avatar = screen.getByText("AB").closest('[data-slot="avatar"]');
        expect(avatar).toHaveAttribute("data-size", size);
        unmount();
      }
    });

    it("should apply custom className", () => {
      render(
        <Avatar className="custom-avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      const avatar = screen.getByText("AB").closest('[data-slot="avatar"]');
      expect(avatar).toHaveClass("custom-avatar");
    });
  });

  describe("AvatarImage", () => {
    it("should render avatar image", () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
    });
  });

  describe("AvatarFallback", () => {
    it("should render fallback text", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.getByText("JD").closest('[data-slot="avatar-fallback"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Avatar>
          <AvatarFallback className="custom-fallback">AB</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByText("AB");
      expect(fallback).toHaveClass("custom-fallback");
    });
  });

  describe("AvatarBadge", () => {
    it("should render badge", () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
          <AvatarBadge>✓</AvatarBadge>
        </Avatar>
      );
      const badge = screen.getByText("✓");
      expect(badge).toBeInTheDocument();
      expect(badge.closest('[data-slot="avatar-badge"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
          <AvatarBadge className="custom-badge">✓</AvatarBadge>
        </Avatar>
      );
      const badge = screen.getByText("✓");
      expect(badge).toHaveClass("custom-badge");
    });
  });

  describe("AvatarGroup", () => {
    it("should render avatar group", () => {
      render(
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      );
      const group = screen.getByText("AB").closest('[data-slot="avatar-group"]');
      expect(group).toBeInTheDocument();
      expect(screen.getByText("AB")).toBeInTheDocument();
      expect(screen.getByText("CD")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <AvatarGroup className="custom-group">
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      );
      const group = screen.getByText("AB").closest('[data-slot="avatar-group"]');
      expect(group).toHaveClass("custom-group");
    });
  });

  describe("AvatarGroupCount", () => {
    it("should render group count", () => {
      render(
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+5</AvatarGroupCount>
        </AvatarGroup>
      );
      const count = screen.getByText("+5");
      expect(count).toBeInTheDocument();
      expect(count.closest('[data-slot="avatar-group-count"]')).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="custom-count">+3</AvatarGroupCount>
        </AvatarGroup>
      );
      const count = screen.getByText("+3");
      expect(count).toHaveClass("custom-count");
    });
  });
});
