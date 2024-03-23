const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("VITE_API_URL must be defined in .env");
}

export interface ApiResponse<T> {
  success: boolean;
  data: any;
}

export interface ApiError<T> extends ApiResponse<T> {
  success: false;
  data: {
    error: string;
  };
}

export interface ApiSuccess<T> extends ApiResponse<T> {
  success: true;
  data: T;
}

/**
 * Make a request to the API.
 *
 * @param route The api route
 * @param method The request method
 * @param body The request body (must be JSON.stringify-able)
 *
 * @returns The fetch response
 */
export async function useApi<T>(route: string, method: string, body: Object): Promise<ApiResponse<T>> {
  const url = `${API_URL}${route}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
