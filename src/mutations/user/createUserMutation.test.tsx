import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateUserMutation } from "./createUserMutation";
import { createUser } from "@/fetchers/fetchUser/createUser";
import type { CreateUser, User } from "@/types/types";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/fetchers/fetchUser/createUser", () => ({
  createUser: vi.fn(),
}));

describe("useCreateUserMutation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should create user successfully and show success toast", async () => {
    const { toast } = await import("sonner");
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

    vi.mocked(createUser).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useCreateUserMutation(), { wrapper });

    result.current.mutate(createUserData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(createUser).toHaveBeenCalledWith(createUserData);
    expect(toast.success).toHaveBeenCalledWith("User created successfully");
  });

  it("should show error toast when mutation fails", async () => {
    const { toast } = await import("sonner");
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

    const error = new Error("Failed to create user");
    vi.mocked(createUser).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCreateUserMutation(), { wrapper });

    result.current.mutate(createUserData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to create user: Failed to create user"
    );
  });

  it("should invalidate users query on success", async () => {
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

    vi.mocked(createUser).mockResolvedValueOnce(mockUser);

    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateUserMutation(), { wrapper });

    result.current.mutate(createUserData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["users"] });
  });
});
