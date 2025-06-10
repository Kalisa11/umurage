const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || "Something went wrong" };
  }
  const data = await response.json();
  return { data };
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { error: "Network error occurred" };
  }
}

// API functions for categories
export const api = {
  // Get all categories
  getCategories: () => fetchApi<Category[]>("/categories"),

  // Get a single category
  getCategory: (id: number) => fetchApi<Category>(`/categories/${id}`),

  // Create a new category
  createCategory: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) =>
    fetchApi<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
