import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateUser } from "./updateUser";
import type { User, UpdateUser } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("updateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should update user successfully", async () => {
    const updateUserData: UpdateUser = {
      name: "Jane Doe",
      email: "jane@example.com",
    };

    const mockUpdatedUser: User = {
      id: 1,
      name: "Jane Doe",
      username: "johndoe",
      email: "jane@example.com",
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
      json: async () => mockUpdatedUser,
    } as Response);

    const result = await updateUser(1, updateUserData);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/1"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateUserData, id: 1 }),
      }
    );
    expect(result).toEqual(mockUpdatedUser);
  });

  it("should throw error when response is not ok", async () => {
    const updateUserData: UpdateUser = {
      name: "Jane Doe",
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(updateUser(1, updateUserData)).rejects.toThrow(
      "Failed to update user: Not Found"
    );
  });

  it("should throw error when response data is invalid", async () => {
    const updateUserData: UpdateUser = {
      name: "Jane Doe",
    };

    const invalidData = {
      id: "not-a-number",
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(updateUser(1, updateUserData)).rejects.toThrow(
      "Invalid user data format"
    );
  });

  it("should throw error when fetch fails", async () => {
    const updateUserData: UpdateUser = {
      name: "Jane Doe",
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(updateUser(1, updateUserData)).rejects.toThrow(
      "Network error"
    );
  });
});
