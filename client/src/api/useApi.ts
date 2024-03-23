export const API_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : `${location.protocol}//${location.hostname}:3000`;
if (!API_URL) {
  throw new Error("VITE_API_URL must be defined in .env");
}

export interface ApiError {
  success: false;
  data: {
    error: string;
  };
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiError | ApiSuccess<T>;

/**
 * Make a request to the API.
 *
 * @param route The api route
 * @param method The request method
 * @param body The request body (must be JSON.stringify-able)
 *
 * @returns The fetch response
 */
export async function useApi<T>(
  route: string,
  method: string,
  body: { [index: string]: any }
): Promise<ApiResponse<T>> {
  const url = new URL(`${API_URL}${route}`);

  if (method === "GET") {
    for (const key in body) {
      url.searchParams.append(key, String(body[key]));
    }
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      return {
        success: false,
        data: {
          error: await res.text(),
        },
      };
    }

    return {
      success: true,
      data: await res.json(),
    };
  } catch (error) {
    return {
      success: false,
      data: {
        error: String(error),
      },
    };
  }
}
