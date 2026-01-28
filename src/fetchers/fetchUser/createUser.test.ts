import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createUser } from "./createUser";
import type { User, CreateUser } from "@/types/types";

vi.stubGlobal("fetch", vi.fn());

describe("createUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create user successfully", async () => {
    const createUserData: CreateUser = {
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

    const mockCreatedUser: User = {
      id: 1,
      ...createUserData,
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreatedUser,
    } as Response);

    const result = await createUser(createUserData);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserData),
      }
    );
    expect(result).toEqual(mockCreatedUser);
  });

  it("should throw error when response is not ok", async () => {
    const createUserData: CreateUser = {
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
      ok: false,
      statusText: "Bad Request",
    } as Response);

    await expect(createUser(createUserData)).rejects.toThrow(
      "Failed to create user: Bad Request"
    );
  });

  it("should throw error when response data is invalid", async () => {
    const createUserData: CreateUser = {
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

    const invalidData = {
      id: "not-a-number",
    };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(createUser(createUserData)).rejects.toThrow(
      "Invalid user data format"
    );
  });

  it("should throw error when fetch fails", async () => {
    const createUserData: CreateUser = {
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

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network error")
    );

    await expect(createUser(createUserData)).rejects.toThrow("Network error");
  });
});
