import { ApiRoutes } from "@/types";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

async function fetchData<T>(
  url: ApiRoutes,
  method: HttpMethod = "GET",
  options?: FetchOptions
): Promise<T> {
  const { params, headers, ...fetchOptions } = options || {};

  let fetchUrl = url;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    fetchUrl += `?${queryString}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...fetchOptions,
  };

  const response = await fetch(fetchUrl, requestOptions);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function get<T>(
  url: ApiRoutes,
  options?: FetchOptions
): Promise<T> {
  return fetchData<T>(url, "GET", options);
}

export async function post<T>(
  url: ApiRoutes,
  data?: any,
  options?: FetchOptions
): Promise<T> {
  return fetchData<T>(url, "POST", {
    ...options,
    body: JSON.stringify(data),
  });
}

export async function put<T>(
  url: ApiRoutes,
  data?: any,
  options?: FetchOptions
): Promise<T> {
  return fetchData<T>(url, "PUT", {
    ...options,
    body: JSON.stringify(data),
  });
}

export async function del<T>(
  url: ApiRoutes,
  data?: any,
  options?: FetchOptions
): Promise<T> {
  return fetchData<T>(url, "POST", {
    ...options,
    body: JSON.stringify(data),
  });
}
