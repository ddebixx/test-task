import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import { useDeleteUserMutation } from "./deleteUserMutation";
import { deleteUser } from "@/fetchers/fetchUser/deleteUser";
import { usersQueryKey } from "@/queries/usersQueryOptions";

const mockToast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("sonner", () => ({ toast: mockToast }));

vi.mock("@/fetchers/fetchUser/deleteUser", () => ({
  deleteUser: vi.fn(),
}));

describe("useDeleteUserMutation", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      mutationCache: new MutationCache({
        onError: (error) => {
          mockToast.error(error instanceof Error ? error.message : "Something went wrong")
        },
      }),
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should delete user successfully and show success toast", async () => {
    const { toast } = await import("sonner");

    vi.mocked(deleteUser).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useDeleteUserMutation(), { wrapper });

    result.current.mutate(1);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(deleteUser).toHaveBeenCalledWith(1, expect.anything());
    expect(toast.success).toHaveBeenCalledWith("User deleted successfully");
  });

  it("should show error toast when mutation fails", async () => {
    const { toast } = await import("sonner");

    const error = new Error("Failed to delete user");
    vi.mocked(deleteUser).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDeleteUserMutation(), { wrapper });

    result.current.mutate(1);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(deleteUser).toHaveBeenCalledWith(1, expect.anything());
    expect(toast.error).toHaveBeenCalledWith("Failed to delete user");
  });

  it("should invalidate users query on success", async () => {
    vi.mocked(deleteUser).mockResolvedValueOnce(undefined);

    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteUserMutation(), { wrapper });

    result.current.mutate(1);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: usersQueryKey });
  });
});
