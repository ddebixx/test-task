import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUserById } from "./fetchUserById";
import type { User } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("fetchUserById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and return user by id successfully", async () => {
    const mockUser: User = {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      address: {
        street: "123 Main St",
        suite: "Apt 1",
        city: "New York",
        zipcode: "10001",
        geo: {
          lat: "40.7128",
          lng: "-74.0060",
        },
      },
      phone: "123-456-7890",
      website: "johndoe.com",
      company: {
        name: "Acme Corp",
        catchPhrase: "We make things",
        bs: "synergize",
      },
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const result = await fetchUserById("1");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/1")
    );
    expect(result).toEqual(mockUser);
  });

  it("should throw error when response is not ok", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchUserById("1")).rejects.toThrow(
      "Failed to fetch user: Not Found"
    );
  });

  it("should throw error when response data is invalid", async () => {
    const invalidData = {
      id: "not-a-number",
      name: "John Doe",
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(fetchUserById("1")).rejects.toThrow(
      "Invalid user data format"
    );
  });

  it("should throw error when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchUserById("1")).rejects.toThrow("Network error");
  });
});
