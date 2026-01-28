import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUserPostsByUserId } from "./fetchUserPostsByUserId";
import type { Post } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("fetchUserPostsByUserId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and return posts by user id successfully", async () => {
    const mockPosts: Post[] = [
      {
        userId: 1,
        id: 1,
        title: "Test Post",
        body: "This is a test post",
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response);

    const result = await fetchUserPostsByUserId("1");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts?userId=1")
    );
    expect(result).toEqual(mockPosts);
  });

  it("should throw error when response is not ok", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchUserPostsByUserId("1")).rejects.toThrow(
      "Failed to fetch posts: Not Found"
    );
  });

  it("should throw error when response data is invalid", async () => {
    const invalidData = [
      {
        userId: "not-a-number",
        id: 1,
        title: "Test Post",
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(fetchUserPostsByUserId("1")).rejects.toThrow(
      "Invalid posts data format"
    );
  });

  it("should throw error when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchUserPostsByUserId("1")).rejects.toThrow(
      "Network error"
    );
  });
});
