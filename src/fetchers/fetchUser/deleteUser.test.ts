import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deleteUser } from "./deleteUser";

vi.stubGlobal("fetch", vi.fn());

describe("deleteUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should delete user successfully", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    } as Response);

    await deleteUser(1);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/1"),
      {
        method: "DELETE",
      }
    );
  });

  it("should throw error when response is not ok", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(deleteUser(1)).rejects.toThrow(
      "Failed to delete user: Not Found"
    );
  });

  it("should throw error when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(deleteUser(1)).rejects.toThrow("Network error");
  });
});
