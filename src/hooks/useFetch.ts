import { useEffect, useState, useCallback } from "react";

interface FetchOptions extends RequestInit {
  immediate?: boolean; // có fetch ngay khi mount không
}

export function useFetch<T = unknown>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(!!options?.immediate);

  const fetchData = useCallback(
    async (overrideOpts?: RequestInit) => {
      if (!url) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
          ...options,
          ...overrideOpts,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = (await res.json()) as T;
        setData(json);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  // Fetch ngay khi mount nếu có `immediate`
  useEffect(() => {
    if (options?.immediate) fetchData();
  }, [fetchData, options?.immediate]);

  return { data, error, loading, fetchData };
}
