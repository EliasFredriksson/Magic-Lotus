import { useCallback, useRef, useState } from "react";

type Props<T> = {
  initValue: T;
  serviceFunction: any;
  onError?: (msg: string) => void;
};

const useFetch = <T,>(
  props: Props<T>
): {
  isLoading: boolean;
  success: boolean;
  error: string;
  data: any;
  triggerFetch: (
    args: Parameters<typeof props.serviceFunction>
  ) => Promise<void>;
  abort: () => void;
} => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const [data, setData] = useState<any>(
    props?.initValue ? props.initValue : null
  );

  type functionType = Parameters<typeof props.serviceFunction>;

  const abort = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  };

  const triggerFetch = useCallback(
    async (args: Parameters<typeof props.serviceFunction>) => {
      setIsLoading(true);
      try {
        const res = await props.serviceFunction(...args);
        console.log("RES: ", res);
        setData(res);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        if (props?.onError) props.onError((error as Error).message);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    success,
    error,
    data,
    triggerFetch,
    abort,
  };
};

export default useFetch;
