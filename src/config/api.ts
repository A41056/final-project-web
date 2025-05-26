import { useAuthStore } from "@/stores/authStore";
import { Review } from "@/types/review";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

const USER_API_URL = import.meta.env.USER_API_URL || "http://localhost:6006";
const CATALOG_API_URL =
  import.meta.env.CATALOG_API_URL || "http://localhost:6009";
const ORDER_API_URL = import.meta.env.ORDER_API_URL || "http://localhost:6003";
const BASKET_API_URL =
  import.meta.env.BASKET_API_URL || "http://localhost:6001";
const MEDIA_API_URL = import.meta.env.MEDIA_API_URL || "http://localhost:6010";
const REVIEW_API_URL =
  import.meta.env.REVIEW_API_URL || "http://localhost:6007";

const handleApiError = (response: Response) => {
  if (response.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = "/login";
  }
  throw new Error(`API error: ${response.status} - ${response.statusText}`);
};
const refreshToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  const response = await fetch(`${USER_API_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error("Unable to refresh token");

  const data = await response.json();
  const { token, refreshToken: newRefreshToken, user } = data;
  useAuthStore.getState().login(token, newRefreshToken, user);
  return token;
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = useAuthStore.getState().token;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      token = await refreshToken();

      headers.set("Authorization", `Bearer ${token}`);
      response = await fetch(url, { ...options, headers });
    } catch (err) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

const fetchFormDataWithAuth = async (url: string, formData: FormData) => {
  const token = useAuthStore.getState().token;
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers,
  });

  if (!response.ok) handleApiError(response);
  return response.json();
};

const deleteWithAuth = async (url: string) => {
  const token = useAuthStore.getState().token;
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) handleApiError(response);
  return response.json();
};

// User API with React Query
export const userApi = {
  useGet: (endpoint: string) =>
    useQuery({
      queryKey: ["user", endpoint],
      queryFn: () => fetchWithAuth(`${USER_API_URL}${endpoint}`),
    }),

  usePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${USER_API_URL}${endpoint}`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
  },

  usePut: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${USER_API_URL}${endpoint}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (endpoint: string) =>
        fetchWithAuth(`${USER_API_URL}${endpoint}`, {
          method: "DELETE",
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
  },

  useLogin: () =>
    useMutation({
      mutationFn: ({ Email, Password }: { Email: string; Password: string }) =>
        fetchWithAuth(`${USER_API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({ Email, Password }),
        }),
    }),

  useResetPassword: () =>
  useMutation({
    mutationFn: (data: { email: string }) =>
      fetch(`${USER_API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Reset failed");
        return res.json();
      }),
  }),
};

// Catalog API with React Query
export const catalogApi = {
  useGet: <TData, TResult = TData>(
    endpoint: string,
    params?: Record<string, any>,
    options?: UseQueryOptions<TData, unknown, TResult>
  ) =>
    useQuery<TData, unknown, TResult>({
      queryKey: ["catalog", endpoint, params],
      queryFn: () => {
        const url = new URL(`${CATALOG_API_URL}${endpoint}`);
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((item) => url.searchParams.append(key, item));
            } else if (value !== undefined && value !== null) {
              url.searchParams.append(key, value.toString());
            }
          });
        }
        return fetchWithAuth(url.toString());
      },
      ...options,
    }),

  usePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${CATALOG_API_URL}${endpoint}`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["catalog"] }),
    });
  },

  usePut: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${CATALOG_API_URL}${endpoint}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["catalog"] }),
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (endpoint: string) =>
        fetchWithAuth(`${CATALOG_API_URL}${endpoint}`, {
          method: "DELETE",
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["catalog"] }),
    });
  },
};

// Order API with React Query
export const orderApi = {
  useGet: (endpoint: string) =>
    useQuery({
      queryKey: ["order", endpoint],
      queryFn: () => fetchWithAuth(`${ORDER_API_URL}${endpoint}`),
    }),

  usePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${ORDER_API_URL}${endpoint}`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["order"] }),
    });
  },

  usePut: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${ORDER_API_URL}${endpoint}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["order"] }),
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (endpoint: string) =>
        fetchWithAuth(`${ORDER_API_URL}${endpoint}`, {
          method: "DELETE",
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["order"] }),
    });
  },
};

// Basket API with React Query
export const basketApi = {
  useGet: <TData>(endpoint: string, options?: UseQueryOptions<TData>) =>
    useQuery<TData>({
      queryKey: ["basket", endpoint],
      queryFn: () => fetchWithAuth(`${BASKET_API_URL}${endpoint}`),
      ...options,
    }),

  usePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${BASKET_API_URL}${endpoint}`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
    });
  },

  usePut: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ endpoint, data }: { endpoint: string; data: any }) =>
        fetchWithAuth(`${BASKET_API_URL}${endpoint}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (endpoint: string) =>
        fetchWithAuth(`${BASKET_API_URL}${endpoint}`, {
          method: "DELETE",
        }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
    });
  },
};

// Media API with React Query
export const mediaApi = {
  useGetFileTypes: (endpoint: string) =>
    useQuery({
      queryKey: ["media", "fileTypes", endpoint],
      queryFn: () => fetchWithAuth(`${MEDIA_API_URL}${endpoint}`),
    }),

  useUploadFile: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (formData: FormData) =>
        fetchFormDataWithAuth(`${MEDIA_API_URL}/files`, formData),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
    });
  },

  useDeleteFile: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (fileName: string) =>
        deleteWithAuth(`${MEDIA_API_URL}/files/${fileName}`),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
    });
  },
};

interface PaginatedResult<T> {
  PageIndex: number;
  PageSize: number;
  Count: number;
  Data: T[];
}

export const reviewApi = {
  useGetReviewsByProductId: (
    productId: string,
    pagination: { pageIndex: number; pageSize: number }
  ) =>
    useQuery<PaginatedResult<Review>, Error>({
      queryKey: ["reviews", productId, pagination.pageIndex],
      queryFn: async () => {
        const url = new URL(`${REVIEW_API_URL}/reviews/product/${productId}`);
        url.searchParams.append("pageIndex", pagination.pageIndex.toString());
        url.searchParams.append("pageSize", pagination.pageSize.toString());

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Không thể tải đánh giá");
        }

        const json = await response.json();

        return {
          PageIndex: pagination.pageIndex,
          PageSize: pagination.pageSize,
          Count: json.totalItems,
          Data: json.reviews,
        };
      },
    }),

  usePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: {
        productId: string;
        userId: string;
        rating: number;
        comment: string;
      }) =>
        fetch(`${REVIEW_API_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["reviews", variables.productId]);
      },
      onError: () => {
        throw new Error("Không thể tạo đánh giá");
      },
    });
  },

  usePut: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: { id: string; rating: number; comment: string }) =>
        fetch(`${REVIEW_API_URL}/reviews`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["reviews"]);
      },
      onError: () => {
        throw new Error("Không thể cập nhật đánh giá");
      },
    });
  },
};
