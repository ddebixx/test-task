import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUsers } from "./fetchUser";
import type { User } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("fetchUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and return users successfully", async () => {
    const mockUsers: User[] = [
      {
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
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const result = await fetchUsers();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users")
    );
    expect(result).toEqual(mockUsers);
  });

  it("should throw error when response is not ok", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchUsers()).rejects.toThrow("Failed to fetch users: Not Found");
  });

  it("should throw error when response data is invalid", async () => {
    const invalidData = [
      {
        id: "not-a-number",
        name: "John Doe",
      },
    ];

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(fetchUsers()).rejects.toThrow("Invalid user data format");
  });

  it("should throw error when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchUsers()).rejects.toThrow("Network error");
  });
});
