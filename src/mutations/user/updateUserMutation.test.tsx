import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateUserMutation } from "./updateUserMutation";
import { updateUser } from "@/fetchers/fetchUser/updateUser";
import { usersQueryKey } from "@/queries/usersQueryOptions";
import type { CreateUser, User } from "@/types/types";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/fetchers/fetchUser/updateUser", () => ({
  updateUser: vi.fn(),
}));

describe("useUpdateUserMutation", () => {
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

  it("should update user successfully and show success toast", async () => {
    const { toast } = await import("sonner");
    const mockUser: User = {
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

    const updateUserData: CreateUser = {
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

    vi.mocked(updateUser).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useUpdateUserMutation(), { wrapper });

    result.current.mutate({ userId: 1, data: updateUserData });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(updateUser).toHaveBeenCalledWith(1, updateUserData);
    expect(toast.success).toHaveBeenCalledWith("User updated successfully");
  });

  it("should show error toast when mutation fails", async () => {
    const { toast } = await import("sonner");
    const updateUserData: CreateUser = {
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

    const error = new Error("Failed to update user");
    vi.mocked(updateUser).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUpdateUserMutation(), { wrapper });

    result.current.mutate({ userId: 1, data: updateUserData });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to update user: Failed to update user"
    );
  });

  it("should invalidate users query on success", async () => {
    const mockUser: User = {
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

    const updateUserData: CreateUser = {
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

    vi.mocked(updateUser).mockResolvedValueOnce(mockUser);

    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateUserMutation(), { wrapper });

    result.current.mutate({ userId: 1, data: updateUserData });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: usersQueryKey });
  });
});
