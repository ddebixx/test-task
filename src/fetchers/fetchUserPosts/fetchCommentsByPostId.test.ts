import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchCommentsByPostId } from "./fetchCommentsByPostId";
import type { Comment } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("fetchCommentsByPostId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and return comments by post id successfully", async () => {
    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        body: "This is a comment",
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
    } as Response);

    const result = await fetchCommentsByPostId(1);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts/1/comments")
    );
    expect(result).toEqual(mockComments);
  });

  it("should throw error when response is not ok", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchCommentsByPostId(1)).rejects.toThrow(
      "Failed to fetch comments: Not Found"
    );
  });

  it("should throw error when response data is invalid", async () => {
    const invalidData = [
      {
        postId: "not-a-number",
        id: 1,
        name: "John Doe",
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(fetchCommentsByPostId(1)).rejects.toThrow(
      "Invalid comment data format"
    );
  });

  it("should throw error when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchCommentsByPostId(1)).rejects.toThrow("Network error");
  });
});
