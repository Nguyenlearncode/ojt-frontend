import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  // ✅ Phải truyền giá trị khởi tạo, ở đây là null
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
