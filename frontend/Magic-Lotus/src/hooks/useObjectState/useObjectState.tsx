import { useState } from "react";

export default function <T>(blankData: T): [T, (changes: Partial<T>) => void] {
  const [state, updateState] = useState<T>(blankData);
  const setState = (changes: Partial<T>) => {
    updateState((prev) => {
      return {
        ...prev,
        ...changes,
      };
    });
  };
  return [state, setState];
}
